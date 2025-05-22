// Carrito en memoria (se perderá al recargar la página)
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(producto_id, nombre, precio, cantidad = 1) {
  const itemExistente = carrito.find(item => item.producto_id === producto_id);
  
  if (itemExistente) {
    itemExistente.cantidad += cantidad;
  } else {
    carrito.push({ producto_id, nombre, precio, cantidad });
  }
  
  actualizarVistaCarrito();
}

// Función para eliminar productos
function eliminarDelCarrito(producto_id) {
  carrito = carrito.filter(item => item.producto_id !== producto_id);
  actualizarVistaCarrito();
}

// Actualizar la vista del carrito en HTML
function actualizarVistaCarrito() {
  const contenedor = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total-carrito');
  let total = 0;
  
  contenedor.innerHTML = '';
  
  carrito.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.nombre} - $${item.precio} x ${item.cantidad}
      <button onclick="eliminarDelCarrito(${item.producto_id})">Eliminar</button>
    `;
    contenedor.appendChild(li);
    total += item.precio * item.cantidad;
  });
  
  totalElemento.textContent = `Total: $${total}`;
}

// Finalizar compra (crear pedido)
async function finalizarCompra(usuario_id) {
  if (carrito.length === 0) return alert('Carrito vacío');
  
  try {
    const response = await fetch('/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario_id,
        items: carrito.map(item => ({
          producto_id: item.producto_id,
          cantidad: item.cantidad
        }))
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert(`Pedido #${data.pedido_id} creado`);
      carrito = [];
      actualizarVistaCarrito();
    }
  } catch (error) {
    alert('Error al crear pedido');
  }
}