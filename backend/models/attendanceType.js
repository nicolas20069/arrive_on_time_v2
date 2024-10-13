import { pool } from "../config/db.js";

export class AttendanceTypeModel {
  // Query para obtener todos los tipos de asistencia
  static async getAll() {
    try {
      const [attendancesType] = await pool.query("SELECT * FROM tipo_asistencia");
      return attendancesType;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para obtener un tipo de asistencia por su id
  static async getById({ id }) {
    try {
      const [attendanceType] = await pool.query(
        "SELECT * FROM tipo_asistencia WHERE tipo_id = ?",
        [id]
      );
      return attendanceType;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para crear un tipo de asistencia
  static async create({ input }) {
    const { attendanceTypeName } = input;

    try {
      const [confirmAttendanceType] = await pool.query(
        "SELECT * FROM tipo_asistencia WHERE tipo_id = ?",
        [attendanceTypeName]
      );
      if (confirmAttendanceType.length > 0) {
        throw new Error("El tipo de asistencia ya existe");
      }

      const [result] = await pool.query(
        "INSERT INTO tipo_asistencia (tipo_asistencia) VALUES (?)",
        [attendanceTypeName]
      );

      return { id: result.insertId, attendanceTypeName };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  // Query para actualizar un rol
  static async update({ id, input }) {
    const { attendanceTypeName } = input;
    
    try {

      const [result] = await pool.query(
        "UPDATE tipo_asistencia SET tipo_asistencia = ? WHERE tipo_id = ?",
        [
          attendanceTypeName,
          id,
        ]
      );

      return result.affectedRows;
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar el tipo de asistencia");
    }
  }

  // Query para eliminar un tipo de asistencia
  static async delete({ id }) {
    try {
      const [result] = await pool.query(
        "DELETE FROM tipo_asistencia WHERE tipo_id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el tipo de asistencia");
    }
  }
}
