const pool = require('../config/db');
const PDFDocument = require('pdfkit');

exports.crearFactura = async (req, res) => {
  const { cliente_id, items, metodo_pago } = req.body;
  
  try {
    // Calcular total
    const total = items.reduce((sum, item) => sum + (item.precio_unitario * item.cantidad), 0);

    // Crear factura
    const [factura] = await pool.query(
      'INSERT INTO facturas (cliente_id, total, metodo_pago) VALUES (?, ?, ?)',
      [cliente_id, total, metodo_pago]
    );
    const facturaId = factura.insertId;

    // Insertar items
    for (const item of items) {
      await pool.query(
        'INSERT INTO items_factura (factura_id, producto_id, cantidad, precio_unitario) VALUES (?, ?, ?, ?)',
        [facturaId, item.producto_id, item.cantidad, item.precio_unitario]
      );
    }

    res.json({ facturaId, message: 'Factura creada exitosamente' });
  } catch (error) {
    console.error('Error al crear factura:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.generarPDF = async (req, res) => {
  const { id } = req.params;
  
  try {
    const [factura] = await pool.query('SELECT * FROM facturas WHERE id = ?', [id]);
    const [items] = await pool.query(`
      SELECT p.nombre, i.cantidad, i.precio_unitario 
      FROM items_factura i
      JOIN productos p ON i.producto_id = p.id
      WHERE i.factura_id = ?
    `, [id]);

    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${id}.pdf`);
    doc.pipe(res);

    // Encabezado
    doc.fontSize(20).text('Taller de Manolo', { align: 'center' });
    doc.fontSize(14).text(`Factura #${id}`, { align: 'center' });
    doc.moveDown();

    // Detalles
    doc.fontSize(12).text(`Fecha: ${new Date(factura[0].fecha).toLocaleDateString()}`);
    doc.text(`Cliente: ${factura[0].cliente_id}`); // Puedes unir con tabla usuarios
    doc.moveDown();

    // Items
    doc.fontSize(14).text('Detalle:', { underline: true });
    items.forEach(item => {
      doc.text(`${item.nombre} - ${item.cantidad} x $${item.precio_unitario}`);
    });
    doc.moveDown();
    doc.fontSize(16).text(`Total: $${factura[0].total}`, { align: 'right' });

    doc.end();
  } catch (error) {
    console.error('Error al generar PDF:', error);
    res.status(500).json({ error: 'Error al generar factura' });
  }
};