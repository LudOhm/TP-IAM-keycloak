import { jwtDecode } from "jwt-decode";

function Private() {
  const token = localStorage.getItem("token");

  const decoded = jwtDecode(token);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Page privée 🔒</h2>

      <table border="1" cellPadding="10">
        <tbody>
          {Object.entries(decoded).map(([key, value]) => (
            <tr key={key}>
              <td><b>{key}</b></td>
              <td>{JSON.stringify(value)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Private;