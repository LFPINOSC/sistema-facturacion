// controllers/authController.js
import Usuario from "../models/Usuario.js";
import TipoUsuario from "../models/TipoUsuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret123";

// Registrar usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password, tipo } = req.body;

    // Solo permitir crear Admin si se usa la clave especial
    if (tipo === "Admin") {
      if (password !== "admin") {
        return res.status(403).json({ error: "Solo se puede crear Admin con la clave especial 'admin'" });
      }
    }

    // Buscar tipo de usuario
    let tipoUsuario = await TipoUsuario.findOne({ where: { nombre: tipo } });
    if (!tipoUsuario) {
      tipoUsuario = await TipoUsuario.create({ nombre: tipo, descripcion: `${tipo} del sistema` });
    }

    const usuario = await Usuario.create({
      nombre,
      email,
      password,  // bcrypt lo encripta automáticamente
      tipo_usuario_id: tipoUsuario.id
    });

    res.status(201).json({ msg: "Usuario creado", usuario: { id: usuario.id, email: usuario.email, tipo } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, tipo_usuario_id: usuario.tipo_usuario_id },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
