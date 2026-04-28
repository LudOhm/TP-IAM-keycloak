import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Private from "./Private";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>

        {/* Page login */}
        <Route path="/" element={<Login />} />

        {/* Page privée protégée */}
        <Route
          path="/private"
          element={token ? <Private /> : <Navigate to="/" />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;