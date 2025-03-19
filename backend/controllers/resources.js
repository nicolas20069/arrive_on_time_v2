import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import mysqldump from "mysqldump";
import xlsx from "xlsx-populate";
import AdmZip from "adm-zip";

import { dbConfig } from "../config/db.js";
import { AttendanceModel } from "../models/attendance.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class ResourcesController {
  // Metodo para exportar la base de datos
  static async getDB(req, res) {
    const { rol_id } = req.params;

    if (+rol_id !== 1) {
      return res.status(401).json({
        message: "No tienes Permisos para descargar la Base de Datos",
      });
    }

    const sqlFile = path.join(__dirname, "../../backup.sql");
    const zipFile = path.join(__dirname, "../../backup.zip");

    try {
      await mysqldump({ connection: dbConfig, dumpToFile: sqlFile });

      await createZip(sqlFile, zipFile);

      res.download(zipFile, "backup.zip", (err) => {
        if (err) {
          console.error("Error al enviar el archivo ZIP:", err);
          res.status(500).send("Error al descargar la base de datos.");
        }

        fs.unlinkSync(zipFile);
      });
    } catch (error) {
      console.error("Error al generar el backup:", error);
      res.status(500).send("Error al generar el backup.");
    }
  }

  // Método para descargar todas las asistencias en formato Excel
  static async getAllAttendances(req, res) {
    const { rol_id } = req.params;

    if (+rol_id !== 1) {
      return res.status(401).json({
        message: "No tienes Permisos para descargar las Asistencias",
      });
    }

    const excelFile = path.join(__dirname, "../asistencias.xlsx");
    const zipFile = path.join(__dirname, "../asistencias.zip");

    try {
      const attendances = await AttendanceModel.getAll();
      await generateExcel(attendances, excelFile);

      await createZip(excelFile, zipFile);

      res.download(zipFile, "asistencias.zip", (err) => {
        if (err) {
          console.error("Error al enviar el archivo ZIP:", err);
          res.status(500).send("Error al descargar las asistencias.");
        }

        fs.unlinkSync(excelFile);
        fs.unlinkSync(zipFile);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las asistencias" });
    }
  }

  // Método para descargar asistencias de un usuario en formato Excel
  static async getYourAttendances(req, res) {
    const { id } = req.params;

    const excelFile = path.join(__dirname, `../asistencias-${id}.xlsx`);
    const zipFile = path.join(__dirname, `../asistencias-${id}.zip`);

    try {
      const attendances = await AttendanceModel.getByUserId({ userId: id });
      await generateExcel(attendances, excelFile);

      await createZip(excelFile, zipFile);

      res.download(zipFile, `asistencias-${id}.zip`, (err) => {
        if (err) {
          console.error("Error al enviar el archivo ZIP:", err);
          res.status(500).send("Error al descargar las asistencias.");
        }

        fs.unlinkSync(excelFile);
        fs.unlinkSync(zipFile);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las asistencias" });
    }
  }
}

// funcion para generar el excel con las asistencias
async function generateExcel(attendances, filePath) {
  const workbook = await xlsx.fromBlankAsync();
  const sheet = workbook.sheet(0);

  sheet.cell("A1").value("ID Asistencia");
  sheet.cell("B1").value("Fecha");
  sheet.cell("C1").value("Hora");
  sheet.cell("D1").value("Nombres");
  sheet.cell("E1").value("Apellidos");
  sheet.cell("F1").value("Cedula");
  sheet.cell("G1").value("Empresa");
  sheet.cell("H1").value("Tipo de Asistencia");

  attendances.forEach((attendance, index) => {
    const row = index + 2;
    sheet.cell(`A${row}`).value(attendance.asistencia_id);
    sheet.cell(`B${row}`).value(attendance.fecha);
    sheet.cell(`C${row}`).value(attendance.hora);
    sheet.cell(`D${row}`).value(attendance.nombres);
    sheet.cell(`E${row}`).value(attendance.apellidos);
    sheet.cell(`F${row}`).value(attendance.cedula);
    sheet.cell(`G${row}`).value(attendance.nombre_empresa);
    sheet.cell(`H${row}`).value(attendance.tipo_asistencia);
  });

  await workbook.toFileAsync(filePath);
}

// funcion para crear un archivo ZIP
async function createZip(sourceFile, zipFile) {
  const zip = new AdmZip();
  zip.addLocalFile(sourceFile);
  zip.writeZip(zipFile);
}
