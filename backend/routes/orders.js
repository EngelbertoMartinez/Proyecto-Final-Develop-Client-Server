const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. CREAR UN PEDIDO (POST: /api/orders)
router.post('/', async (req, res) => {
  try {
    const { clienteNombre, productoNombre, precio } = req.body;

    const nuevaOrden = new Order({
      clienteNombre,
      productoNombre,
      precio
    });

    await nuevaOrden.save();
    res.status(201).json({ msg: '¡Pedido enviado a la barra! ☕', orden: nuevaOrden });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al procesar el pedido.' });
  }
});

// 2. OBTENER TODOS LOS PEDIDOS PENDIENTES (GET: /api/orders)
router.get('/', async (req, res) => {
  try {
    const ordenes = await Order.find({ estado: 'pendiente' }).sort({ createdAt: 1 });
    res.json(ordenes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los pedidos.' });
  }
});

// 3. MARCAR PEDIDO COMO ENTREGADO/PAGADO (PUT: /api/orders/:id)
router.put('/:id', async (req, res) => {
  try {
    const ordenActualizada = await Order.findByIdAndUpdate(
      req.params.id, 
      { estado: 'entregado' }, 
      { new: true }
    );
    res.json({ msg: 'Pedido completado y entregado.', orden: ordenActualizada });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al actualizar el pedido.' });
  }
});

module.exports = router;