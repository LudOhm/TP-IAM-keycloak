# 🔐 TP IAM – Implémentation d’un SSO avec Keycloak et React

**Classe :** M1 CSM

**Date :** 28/04/2026

**Environnement :** MacOS

---

## 📌 Objectif du TP

L’objectif de ce TP est de mettre en place une solution d’**Identity and Access Management (IAM)** en utilisant **Keycloak** afin de :

* Déployer un serveur IAM via Docker
* Configurer un client et un utilisateur
* Mettre en place une authentification avec **OAuth2 / OpenID Connect**
* Récupérer un **JWT (JSON Web Token)**
* Développer une application **React** avec :

  * une page de login
  * une page privée protégée
  * affichage du contenu du token

---

## 🏗️ Architecture du projet

```text
[ React App ]
      |
      | (requête login)
      v
[ Keycloak Server ]
      |
      | (JWT)
      v
[ React stocke le token ]
      |
      | (accès page privée)
      v
[ Affichage du payload ]
```

---

## ⚙️ Technologies utilisées

* React (JavaScript)
* Keycloak
* Docker
* OAuth2 / OpenID Connect
* JWT (JSON Web Token)

---

## 🚀 Déploiement de Keycloak

Le serveur Keycloak est lancé avec Docker :

```bash
docker run -p 8080:8080 \
-e KC_BOOTSTRAP_ADMIN_USERNAME=admin \
-e KC_BOOTSTRAP_ADMIN_PASSWORD=admin \
quay.io/keycloak/keycloak:26.0.1 start-dev
```

Accès :
👉 http://localhost:8080

---

## 🔧 Configuration Keycloak

### 1. Création d’un Realm

* Nom : `tp-iam`

### 2. Création d’un Client

* Client ID : `react-app`
* Access Type : **public**
* Direct Access Grants Enabled : **ON**

### 3. Création d’un utilisateur

* Username : `test`
* Password : `test`
* Temporary : **OFF**

---

## 🔑 Récupération du token (JWT)

Requête utilisée :

```bash
curl -X POST "http://localhost:8080/realms/tp-iam/protocol/openid-connect/token" \
-H "Content-Type: application/x-www-form-urlencoded" \
-d "client_id=react-app" \
-d "username=test" \
-d "password=test" \
-d "grant_type=password"
```

---

## 🔐 OAuth2 Flow utilisé

Le flow utilisé est :

👉 **Resource Owner Password Credentials**

Ce flow permet à l’application d’envoyer directement :

* username
* password


---

## 🧾 Structure d’un JWT

Un JWT est composé de 3 parties :

```
HEADER.PAYLOAD.SIGNATURE
```

### 🔹 Header

Contient :

* alg (algorithme)
* type (JWT)

### 🔹 Payload (affiché dans l’application)

Contient :

* `sub` : identifiant utilisateur
* `preferred_username` : nom utilisateur
* `email`
* `iat` : date d’émission
* `exp` : date d’expiration
* `iss` : serveur émetteur
* `aud` : client

### 🔹 Signature

Permet de vérifier l’intégrité du token (non vérifiée côté frontend).

---

## 🌐 Application React

### 🔑 Page Login

* Formulaire username / password
* Envoi d’une requête POST vers Keycloak
* Stockage du token dans `localStorage`

---

### 🔒 Page privée

* Accessible uniquement si token présent
* Décodage du JWT avec `jwt-decode`
* Affichage du payload dans un tableau HTML

---

### 🔁 Protection des routes

```js
<Route
  path="/private"
  element={token ? <Private /> : <Navigate to="/" />}
/>
```

---

## 📊 Affichage du token

Le payload du JWT est affiché dynamiquement dans un tableau HTML :

* clé
* valeur

---

## 🔓 Déconnexion

Suppression du token :

```js
localStorage.removeItem("token");
```

---

## 🧪 Test avec Postman

Les endpoints OAuth2 peuvent être testés avec Postman :

* URL : `/protocol/openid-connect/token`
* Méthode : POST
* Body : x-www-form-urlencoded

---

## 🔍 Décodage du token

Le token peut être analysé sur :

👉 https://www.jwt.io/

---

## 📁 Structure du projet

```text
project/
├── src/
│   ├── Login.js
│   ├── Private.js
│   └── App.js
├── public/
├── package.json
├── README.md
```

---

**TP réalisé dans le cadre du cours Gestion des Identités à l'EFREI Paris.**

_Année 2025-2026_
 