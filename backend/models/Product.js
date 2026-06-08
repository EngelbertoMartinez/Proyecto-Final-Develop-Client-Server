const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  categoria: { 
    type: String, 
    enum: ['bebidas calientes', 'bebidas frias', 'reposteria', 'otros'], 
    default: 'bebidas calientes' 
  },
  imagen: { type: String, default: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400' }, // Una foto de café por defecto
  disponible: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);