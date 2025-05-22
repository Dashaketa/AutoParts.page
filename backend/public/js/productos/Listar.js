const listaProductos = document.getElementById('listaProductos');

async function obtenerProductos() {
  try {
    const res = await fetch('/productos');
    const productos = await res.json();

    listaProductos.innerHTML = '';

    productos.forEach(producto => {
      const li = document.createElement('li');
      li.innerHTML = `
      <strong>${producto.nombre} ${producto.marca}</strong><br>
      <strong>${producto.marca}</strong><br>
      <img src="/uploads/${producto.imagen}" width="100"><br>
      Precio: $${producto.precio} | Stock: ${producto.stock}
      <br>

      <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">Agregar al carrito</button>
    `;
    

      li.style.border = '1px solid #ccc';
      li.style.margin = '10px';
      li.style.padding = '10px';
      li.style.borderRadius = '8px';

      listaProductos.appendChild(li);
    });

  } catch (err) {
    console.error('Error al cargar productos:', err);
  }
}

// Llamar cuando se cargue la página
document.addEventListener('DOMContentLoaded', obtenerProductos);
