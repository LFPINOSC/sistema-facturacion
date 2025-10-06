// models/Usuario.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import TipoUsuario from "./TipoUsuario.js";
import bcrypt from "bcryptjs";

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: "usuarios",
  timestamps: true,
  hooks: {
    beforeCreate: async (usuario) => {
      const salt = await bcrypt.genSalt(10);
      usuario.password = await bcrypt.hash(usuario.password, salt);
    }
  }
});

// Relación: Usuario pertenece a TipoUsuario
Usuario.belongsTo(TipoUsuario, { foreignKey: "tipo_usuario_id" });

export default Usuario;
