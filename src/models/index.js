import fs from "fs";
import path from "path";
import sequelize from "../config/database.js";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const models = {};

async function loadModels() {
  const files = fs.readdirSync(__dirname).filter(
    (file) => file !== "index.js" && file.endsWith(".js")
  );

  for (const file of files) {
    const filePath = path.join(__dirname, file);
    const fileUrl = pathToFileURL(filePath).href; // ✅ Convertir a file:// URL
    const { default: model } = await import(fileUrl);
    models[model.name] = model;
  }
}

await loadModels();

export { sequelize };
export default models;
