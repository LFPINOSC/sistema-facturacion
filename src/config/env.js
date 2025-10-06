import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "local";

// Seleccionar el archivo .env correspondiente
const envFile = {
  local: ".env.local",
  test: ".env.test",
  production: ".env.production"
}[env];

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

console.log(`✅ Entorno actual: ${env.toUpperCase()}`);
