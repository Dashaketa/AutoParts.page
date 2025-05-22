//Crear Usuarios

document.getElementById('formUsuario').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const nuevoUsuario = {
      nombre: document.getElementById('nombre').value,
      email: document.getElementById('email').value,
      contraseña: document.getElementById('contraseña').value,
      rol: document.getElementById('rol').value
    };
  
    try {
      const response = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });
  
      if (response.ok) {
        alert("Usuario creado con éxito");
        document.getElementById('formUsuario').reset();
      } else {
        const errorText = await response.text();
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      alert("Error de conexión con el servidor");
    }
  });
  