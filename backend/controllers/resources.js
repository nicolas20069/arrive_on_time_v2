import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import mysqldump from "mysqldump";
import xlsx from "xlsx-populate";

import { dbConfig } from "../config/db.js";
import { AttendanceModel } from "../models/attendance.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export class ReoursesController {
  // Método para exportar la base de datos
  static async getDB(req, res) {
    const { rol_id } = req.params;

    if (+rol_id !== 1) {
      // indicar que no tiene permisos para exportar la DB
      return res.status(401).json({
        message: "No tienes Permisos para descargar la Base de Datos",
      });
    }

    const filePath = path.join(__dirname, "../../backup.sql");

    try {
      await mysqldump({
        connection: dbConfig,
        dumpToFile: filePath,
      });

      res.download(filePath, "backup.sql", (err) => {
        if (err) {
          console.error("Error al enviar el archivo:", err);
          res.status(500).send("Error al descargar la base de datos.");
        }
      });
    } catch (error) {
      console.error("Error al generar el backup:", error);
      res.status(500).send("Error al generar el backup.");
    }
  }

  // Método para descargar todas las asistencias
  static async getAllAttendances(req, res) {
    const { rol_id } = req.params;

    if (+rol_id !== 1) {
      // indicar que no tiene permisos para exportar las asistencias
      return res.status(401).json({
        message: "No tienes Permisos para descargar las Asistencias",
      });
    }

    const filePath = path.join(__dirname, "../asistencias.xlsx");

    try {
      const attendances = await AttendanceModel.getAll();
      await generateExcel(attendances, "asistencias.xlsx");

      res.download(filePath, "asistencias.xlsx", (err) => {
        if (err) {
          console.error("Error al enviar el archivo:", err);
          res.status(500).send("Error al descargar las asistencias.");
        }

        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las asistencias" });
    }
  }

  // Método para descargar las asistencias de un usuario (por id)
  static async getYourAttendances(req, res) {
    const { id } = req.params;

    const filePath = path.join(__dirname, `../asistencias-${id}.xlsx`);

    try {
      const attendances = await AttendanceModel.getByUserId({ userId: id });
      await generateExcel(attendances, `asistencias-${id}.xlsx`);

      res.download(filePath, `asistencias-${id}.xlsx`, (err) => {
        if (err) {
          console.error("Error al enviar el archivo:", err);
          res.status(500).send("Error al descargar las asistencias.");
        }

        fs.unlinkSync(filePath);
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las asistencias" });
    }
  }
}

async function generateExcel(attendances, fileName) {
  const workbook = await xlsx.fromBlankAsync();

  workbook.sheet(0).cell("A1").value("ID Asistencia");
  workbook.sheet(0).cell("B1").value("Fecha");
  workbook.sheet(0).cell("C1").value("Hora");
  workbook.sheet(0).cell("D1").value("Nombres");
  workbook.sheet(0).cell("E1").value("Apellidos");
  workbook.sheet(0).cell("F1").value("Cedula");
  workbook.sheet(0).cell("G1").value("Empresa");
  workbook.sheet(0).cell("H1").value("Tipo de Asistencia");

  attendances.forEach((attendance, index) => {
    const row = index + 2;
    workbook.sheet(0).cell(`A${row}`).value(attendance.asistencia_id);
    workbook.sheet(0).cell(`B${row}`).value(attendance.fecha);
    workbook.sheet(0).cell(`C${row}`).value(attendance.hora);
    workbook.sheet(0).cell(`D${row}`).value(attendance.nombres);
    workbook.sheet(0).cell(`E${row}`).value(attendance.apellidos);
    workbook.sheet(0).cell(`F${row}`).value(attendance.cedula);
    workbook.sheet(0).cell(`G${row}`).value(attendance.nombre_empresa);
    workbook.sheet(0).cell(`H${row}`).value(attendance.tipo_asistencia);
  });

  await workbook.toFileAsync(fileName);
}
