// models/TipoUsuario.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const TipoUsuario = sequelize.define("TipoUsuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING
  }
}, {
  tableName: "tipos_usuarios",
  timestamps: true
});

export default TipoUsuario;
