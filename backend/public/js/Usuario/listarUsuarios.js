// listarUsuarios.js

function mostrarUsuarios(usuarios) {
  const tbody = document.querySelector('#tablaUsuarios tbody');
  tbody.innerHTML = usuarios.map(user => `
    <tr>
      <td>${user.id}</td>
      <td>${user.nombre}</td>
      <td>${user.email}</td>
      <td>${user.rol}</td>
      <td>${new Date(user.fecha_creacion).toLocaleString()}</td>
       <td>
        <button onclick="eliminarUsuario(${user.id})">Eliminar</button>
      </td>
    </tr>
  `).join('');
}

async function cargarUsuarios() {
  try {
    const response = await fetch('http://localhost:3000/usuarios');
    const usuarios = await response.json();
    mostrarUsuarios(usuarios);
  } catch (error) {
    console.error('Error al cargar usuarios:', error);
  }
}

async function eliminarUsuario(id) {
  const confirmar = confirm("¿Estás seguro que deseas eliminar este usuario?");
  if (!confirmar) return;

  try {
    const response = await fetch(`http://localhost:3000/usuarios/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      alert("Usuario eliminado correctamente");
      cargarUsuarios(); // Recarga la tabla
    } else {
      const errorText = await response.text();
      alert(`Error al eliminar: ${errorText}`);
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    alert("Error al conectar con el servidor");
  }
}


// Ejecuta la carga al abrir la página
cargarUsuarios();
