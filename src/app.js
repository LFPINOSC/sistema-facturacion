import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import routes from "./routes/index.js"; // importa todas las rutas automáticamente
import { swaggerUi, swaggerSpec } from "./config/swagger.js";
import MigrarUsuarios from "./config/migrarUsuarios.js";
import models from "./models/index.js"; // importa todos los modelos automáticamente

// --------------------------
// Cargar variables de entorno
// --------------------------
const env = process.env.NODE_ENV || "local";
dotenv.config({ path: `.env.${env}` });
console.log(`📌 Entorno cargado: ${env}`);

// --------------------------
// Crear app Express
// --------------------------
const app = express();
app.use(express.json());

// --------------------------
// Ruta raíz de prueba
// --------------------------
app.get("/", (req, res) => res.send("Servidor Express funcionando!"));

// --------------------------
// Conexión y sincronización BD
// --------------------------
(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a PostgreSQL");

    // Sincronizar tablas
    await sequelize.sync({ alter: env !== "production" });
    console.log("📦 Base de datos sincronizada");

    // Migrar usuarios (solo después de sincronizar)
    await MigrarUsuarios.inicializar();
  } catch (err) {
    console.error("❌ Error en la base de datos:", err);
  }
})();

// --------------------------
// Montar rutas
// --------------------------
app.use("/", routes);

// --------------------------
// Documentación Swagger
// --------------------------
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --------------------------
// Inicializar servidor
// --------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
