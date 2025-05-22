document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formularioProducto');
    const listaProductos = document.getElementById('listaProductos');
    let productoEditando = null;
  
    // Guardar o editar producto
    formulario.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(formulario);
      const submitButton = formulario.querySelector('button[type="submit"]'); // Obtener el botón

  
      try {
        const url = productoEditando ? `/productos/${productoEditando}` : '/productos';
        const method = productoEditando ? 'PUT' : 'POST';
  
        const response = await fetch(url, { method, body: formData });
        
        if (response.ok) {
          alert(productoEditando ? 'Producto actualizado' : 'Producto creado');
          formulario.reset();
          submitButton.textContent = 'CREAR'; // Resetear texto aquí
          productoEditando = null;
          obtenerProductos();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    });
  
    // Cargar productos
    async function obtenerProductos() {
      try {
        const res = await fetch('/productos');
        const productos = await res.json();
        
        listaProductos.innerHTML = '';
        productos.forEach(producto => {
          const li = document.createElement('li');
          li.innerHTML = `
            <strong>${producto.nombre}</strong><br>
            <img src="/uploads/${producto.imagen}" width="100"><br>
            Precio: $${producto.precio} | Stock: ${producto.stock}
            <button onclick="editarProducto(${producto.id})">Editar</button>
            <button onclick="eliminarProducto(${producto.id})">Eliminar</button>
          `;
          listaProductos.appendChild(li);
        });
      } catch (err) {
        console.error('Error al cargar productos:', err);
      }
    }
  
    window.editarProducto = async (id) => {
        try {
          const res = await fetch(`/productos/${id}`);
          const producto = await res.json();
          
          // Cambiar el texto del botón al editar
          const submitButton = formulario.querySelector('button[type="submit"]');
          submitButton.textContent = 'Actualizar Producto'; // Texto diferente
          
          // Rellenar formulario
          formulario.nombre.value = producto.nombre;
          formulario.marca.value = producto.marca;
          formulario.descripcion.value = producto.descripcion;
          formulario.precio.value = producto.precio;
          formulario.stock.value = producto.stock;
          formulario.categoria.value = producto.categoria;
          productoEditando = id;
          
          // Opcional: Scroll al formulario para mejor UX
          formulario.scrollIntoView({ behavior: 'smooth' });
        } catch (err) {
          console.error('Error al cargar producto:', err);
        }
      };
  
    // Función para eliminar
    window.eliminarProducto = async (id) => {
      if (!confirm('¿Eliminar producto?')) return;
      await fetch(`/productos/${id}`, { method: 'DELETE' });
      obtenerProductos();
    };
  
    // Inicializar
    obtenerProductos();
  });