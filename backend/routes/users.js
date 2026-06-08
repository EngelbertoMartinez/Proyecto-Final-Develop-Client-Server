const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Importamos el modelo que creamos antes

// 1. RUTA DE REGISTRO (POST: /api/users/register)
router.post('/register', async (req, res) => {
  try {
    const { nombre, email, password, role } = req.body;

    let userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'El correo ya está registrado.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear el nuevo usuario
    const newUser = new User({
      nombre,
      email,
      password: hashedPassword,
      role: role || 'cliente'
    });

    await newUser.save();
    res.status(201).json({ msg: 'Usuario registrado con éxito.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor al registrar.' });
  }
});

// 2. RUTA DE LOGIN (POST: /api/users/login)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Credenciales inválidas (Correo incorrecto).' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Credenciales inválidas (Contraseña incorrecta).' });
    };

    const payload = {
      id: user._id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET || 'FirmaSecretaSuperSegura123', {
      expiresIn: '2h'
    });

    // Responder a React con el token y los datos básicos del usuario
    res.json({
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        role: user.role
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error en el servidor al iniciar sesión.' });
  }
});

module.exports = router;