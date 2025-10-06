import Cliente from "../models/Cliente.js";

/**
 * Controlador para manejar CRUD de Clientes
 */

// ✅ Crear cliente
export const crearCliente = async (req, res) => {
  try {
    const { nombre, correo, telefono } = req.body;

    // Tomar el usuario del token
    const usuarioId = req.usuario.id; // req.usuario viene del middleware protegerRuta

    const nuevoCliente = await Cliente.create({
      nombre,
      correo,
      telefono,
      usuarioId // asignar automáticamente
    });

    res.status(201).json(nuevoCliente);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

// ✅ Obtener todos los clientes del usuario autenticado
export const obtenerClientes = async (req, res) => {
  try {
    // Tomar el ID del usuario autenticado (viene del token)
    const usuarioId = req.usuario.id;

    // Filtrar solo los clientes del usuario autenticado
    const clientes = await Cliente.findAll({
      where: { usuarioId }
    });

    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener los clientes",
      error: error.message
    });
  }
};


// ✅ Obtener cliente por ID
export const obtenerClientePorId = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener el cliente", error: error.message });
  }
};

// ✅ Actualizar cliente
export const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    await cliente.update(req.body);
    res.status(200).json({
      mensaje: "Cliente actualizado correctamente",
      data: cliente
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const mensajes = error.errors.map(err => err.message);
      return res.status(400).json({ errores: mensajes });
    }
    res.status(500).json({ mensaje: "Error al actualizar el cliente", error: error.message });
  }
};

// ✅ Eliminar cliente
export const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado" });
    }

    await cliente.destroy();
    res.status(200).json({ mensaje: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar el cliente", error: error.message });
  }
};
