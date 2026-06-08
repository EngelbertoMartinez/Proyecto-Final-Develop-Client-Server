const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['cliente', 'admin', 'ventas'],
    default: 'cliente'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);