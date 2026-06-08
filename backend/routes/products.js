const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// 1. OBTENER TODOS LOS PRODUCTOS (GET: /api/products)
router.get('/', async (req, res) => {
  try {
    const productos = await Product.find({ disponible: true });
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los productos.' });
  }
});

// 2. CREAR UN NUEVO PRODUCTO (POST: /api/products)
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, precio, categoria, imagen } = req.body;

    if (!nombre || !descripcion || !precio) {
      return res.status(400).json({ msg: 'Por favor, llena los campos obligatorios.' });
    }

    const nuevoProducto = new Product({
      nombre,
      descripcion,
      precio,
      categoria,
      imagen
    });

    await nuevoProducto.save();
    res.status(201).json({ msg: 'Producto agregado al menú con éxito.', producto: nuevoProducto });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al guardar el producto.' });
  }
});

module.exports = router;