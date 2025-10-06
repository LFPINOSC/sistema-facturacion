// middleware/authMiddleware.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret123";

// Mapeo de roles a IDs según tu base de datos
const rolesMap = {
  administrador: 1,
  usuario: 2
};

/**
 * Middleware para proteger rutas según token y roles
 * @param {Array} rolesPermitidos - Lista de roles permitidos (ej: ["administrador","usuario"])
 */
export const protegerRuta = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.usuario = decoded;

      // Convertir rolesPermitidos a IDs
      const rolesPermitidosIds = rolesPermitidos.map(r => rolesMap[r]);

      // Verificar que el rol del usuario esté permitido
      if (rolesPermitidos.length && !rolesPermitidosIds.includes(decoded.tipo_usuario_id)) {
        return res.status(403).json({ error: "Acceso denegado" });
      }

      next(); // continuar a la ruta
    } catch (err) {
      return res.status(401).json({ error: "Token inválido" });
    }
  };
};
