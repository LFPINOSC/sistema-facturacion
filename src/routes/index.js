// routes/index.js
import express from "express";
import clienteRoutes from "./clienteRoutes.js";
import authRoutes from "./authRoutes.js";

const router = express.Router();

// Montar rutas
router.use("/clientes", clienteRoutes);
router.use("/auth", authRoutes);

export default router;
