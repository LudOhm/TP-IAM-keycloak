import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch(
      "http://localhost:8080/realms/tp-iam/protocol/openid-connect/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          client_id: "react-app",
          username: username,
          password: password,
          grant_type: "password",
        }),
      }
    );

    const data = await response.json();

    if (data.access_token) {
      localStorage.setItem("token", data.access_token);
      navigate("/private");
    } else {
      alert("Erreur login");
      console.log(data);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      



      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      



      <button onClick={handleLogin}>Se connecter</button>
    </div>
  );
}

export default Login;
 