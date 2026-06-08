const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  clienteNombre: { type: String, required: true },
  productoNombre: { type: String, required: true },
  precio: { type: Number, required: true },
  estado: { 
    type: String, 
    enum: ['pendiente', 'entregado'], 
    default: 'pendiente' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);