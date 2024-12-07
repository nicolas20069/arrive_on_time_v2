import { AttendanceModel } from "../models/attendance.js";
import { validateAttendance } from "../schemas/attendance.js"

export class AttendanceController {
  // Método para obtener todos las asistencias
  static async getAll(req, res) {
    try {
      const attendances = await AttendanceModel.getAll();
      res.json(attendances);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las asistencias" });
    }
  }

  // Método para obtener una asistencia por su id
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const attendance = await AttendanceModel.getById({ id });
      res.json(attendance);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la asistencia" });
    }
  }

  // Método para obtener todas las asistencias de un usuario
  static async getByUserId(req, res) {
    const { userId } = req.params;

    try {
      const attendances = await AttendanceModel.getByUserId({ userId });
      res.json(attendances);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las asistencias" });
    }
  }

  // Método para crear un tipo de asistencia siendo administrador
  static async create(req, res) {
    const result = validateAttendance(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const attendanceType = await AttendanceModel.create({ input: result.data });
      res.status(201).json(attendanceType);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Método para actualizar un tipo de asistencia siendo administrador
  static async update(req, res) {
    const { id } = req.params;
    const result = validateAttendance(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const attendanceType = await AttendanceModel.update({ id, input: result.data });
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
      const result = await AttendanceModel.delete({ id });
      res.json({ affectedRows: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la asistencia" });
    }
  }
}
