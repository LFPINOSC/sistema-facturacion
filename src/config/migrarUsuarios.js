import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";
import TipoUsuario from "../models/TipoUsuario.js";

class MigrarUsuarios {

  static async inicializar() {
    try {
      // Crear roles si no existen
      const [adminTipo, adminCreated] = await TipoUsuario.findOrCreate({
        where: { nombre: "administrador" },
        defaults: { descripcion: "Usuario con permisos administrativos" }
      });

      const [usuarioTipo, usuarioCreated] = await TipoUsuario.findOrCreate({
        where: { nombre: "usuario" },
        defaults: { descripcion: "Usuario normal sin permisos administrativos" }
      });

      console.log(`✅ Roles verificados: administrador (${adminTipo.id}), usuario (${usuarioTipo.id})`);

      // Crear admin si no existe
      const adminExistente = await Usuario.findOne({ where: { email: "admin@admin.com" } });
      if (!adminExistente) {
        await Usuario.create({
          nombre: "Administrador",
          email: "admin@admin.com",
          password: "admin",
          tipo_usuario_id: adminTipo.id
        });
        console.log("✅ Usuario administrador creado");
      }

      // Crear usuario normal de ejemplo
      const usuarioExistente = await Usuario.findOne({ where: { email: "usuario@usuario.com" } });
      if (!usuarioExistente) {
        await Usuario.create({
          nombre: "Usuario Normal",
          email: "usuario@usuario.com",
          password: "123456",
          tipo_usuario_id: usuarioTipo.id
        });
        console.log("✅ Usuario normal creado");
      }

    } catch (err) {
      console.error("❌ Error al migrar usuarios:", err.message);
    }
  }
}

export default MigrarUsuarios;
