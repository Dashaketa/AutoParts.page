import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function UserStatus() {
  const { usuario } = useContext(AuthContext);

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        marginBottom: "1rem",
      }}
    >
      {usuario ? (
        <p style={{ color: "green", fontWeight: "bold" }}>
          Bienvenido, {usuario.nombre}!{" "}
         
        </p>
      ) : (
        <p style={{ color: "red", fontWeight: "bold" }}>
          No estás logueado. Por favor, inicia sesión o regístrate.
        </p>
      )}
    </div>
  );
}
