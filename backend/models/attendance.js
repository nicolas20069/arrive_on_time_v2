import { pool } from "../config/db.js";

export class AttendanceModel {
  // Query para obtener todos las asistencias
  static async getAll() {
    try {
      const [attendances] = await pool.query(
        "SELECT a.asistencia_id, a.fecha, a.hora, u.nombres, u.apellidos, u.cedula, e.nombre_empresa, t.tipo_asistencia FROM asistencia a JOIN users u ON a.user_id = u.user_id JOIN empresas e ON u.empresa_id = e.empresa_id JOIN tipo_asistencia t ON a.tipo_id = t.tipo_id"
      );
      return attendances;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para obtener una asistencia por su id
  static async getById({ id }) {
    try {
      const [attendance] = await pool.query(
        "SELECT a.asistencia_id, a.fecha, a.hora, u.nombres, u.apellidos, u.cedula, e.nombre_empresa, t.tipo_asistencia FROM asistencia a JOIN users u ON a.user_id = u.user_id JOIN empresas e ON u.empresa_id = e.empresa_id JOIN tipo_asistencia t ON a.tipo_id = t.tipo_id WHERE a.asistencia_id = ?",
        [id]
      );
      return attendance;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para crear un tipo de asistencia
  static async create({ input }) {
    const { date, time, attendanceTypeId, userId } = input;

    try {
      const [result] = await pool.query(
        "INSERT INTO asistencia (fecha, hora, tipo_id, user_id) VALUES (?, ?, ?, ?)",
        [date, time, attendanceTypeId, userId]
      );

      return { id: result.insertId, input };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  // Query para actualizar una asistencia
  static async update({ id, input }) {
    const { date, time, attendanceTypeId, userId } = input;

    try {
      const [result] = await pool.query(
        "UPDATE asistencia SET fecha = ? hora = ? tipo_id = ? user_id = ? WHERE asistencia_id = ?",
        [date, time, attendanceTypeId, userId, id]
      );

      return result.affectedRows;
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar la asistencia");
    }
  }

  // Query para eliminar una asistencia
  static async delete({ id }) {
    try {
      const [result] = await pool.query(
        "DELETE FROM asistencia WHERE asistencia_id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar la asistencia");
    }
  }
}
