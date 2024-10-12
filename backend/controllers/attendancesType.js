import { AttendanceTypeModel } from "../models/attendanceType.js";
import { validateAttendanceType } from "../schemas/attendanceType.js"

export class AttendanceTypeController {
  // Método para obtener todos los tipos de asistencia
  static async getAll(req, res) {
    try {
      const attendancesType = await AttendanceTypeModel.getAll();
      res.json(attendancesType);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los tipos de asistencia" });
    }
  }

  // Método para obtener un tipo de asistencia por su id
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const attendanceType = await AttendanceTypeModel.getById({ id });
      res.json(attendanceType);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el tipo de asistencia" });
    }
  }

  // Método para crear un tipo de asistencia siendo administrador
  static async create(req, res) {
    const result = validateAttendanceType(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    // Validar que el usuario que esta creando sea un administrador
    if (result.data.adminId != 1) {
      return res
        .status(400)
        .json({ message: "No tienes permisos para crear tipos de asistencia" });
    }

    try {
      const attendanceType = await AttendanceTypeModel.create({ input: result.data });
      res.status(201).json(attendanceType);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Método para actualizar un tipo de asistencia siendo administrador
  static async update(req, res) {
    const { id } = req.params;
    const result = validateAttendanceType(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    // Validar que el usuario que esta actualizando sea un administrador
    if (result.data.adminId != 1) {
      return res
        .status(400)
        .json({ message: "No tienes permisos para actualizar tipos de asistencia" });
    }

    try {
      const attendanceType = await AttendanceTypeModel.update({ id, input: result.data });
      res.status(201).json({ affectedRows: attendanceType });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  // Método para eliminar un tipo de asistencia siendo administrador
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await AttendanceTypeModel.delete({ id });
      res.json({ affectedRows: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el tipo de asistencia" });
    }
  }
}
