import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Usuario from "./Usuario.js"; // importa tu modelo de usuario

const Cliente = sequelize.define("Cliente", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "El nombre no puede estar vacío" },
      len: { args: [3, 100], msg: "El nombre debe tener entre 3 y 100 caracteres" }
    }
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: "El correo ya está registrado" },
    validate: {
      notEmpty: { msg: "El correo no puede estar vacío" },
      isEmail: { msg: "Debe ingresar un correo electrónico válido" }
    }
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: { args: [/^\d{7,10}$/], msg: "El teléfono debe contener entre 7 y 10 dígitos" }
    }
  },
  usuarioId: { // FK a Usuario
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id"
    }
  }
}, {
  tableName: "clientes",
  timestamps: true
});

// Relación: un usuario tiene muchos clientes
Usuario.hasMany(Cliente, { foreignKey: "usuarioId" });
Cliente.belongsTo(Usuario, { foreignKey: "usuarioId" });

export default Cliente;
