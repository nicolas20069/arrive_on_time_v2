import path from "node:path";
import fs from "node:fs";

import Minizip from "minizip-asm.js";

export async function createZip(sourceFile, zipFile, password) {
  const mz = new Minizip();

  // Leer el archivo SQL en un Buffer
  const fileData = fs.readFileSync(sourceFile);

  // Obtener solo el nombre del archivo sin la ruta completa
  const fileName = path.basename(sourceFile);

  // Agregar el archivo al ZIP con contraseña y sin incluir rutas completas
  mz.append(fileName, fileData, { password });

  // Guardar el ZIP en el sistema de archivos
  fs.writeFileSync(zipFile, Buffer.from(mz.zip()));
}

/* import AdmZip from "adm-zip"; */
/* // funcion para crear un archivo ZIP sin contraseña
async function createZip(sourceFile, zipFile) {
    const zip = new AdmZip();
    zip.addLocalFile(sourceFile);
    zip.writeZip(zipFile);
} */
