import { pool } from "../config/db.js";

export class RolModel {
  // Query para obtener todos los roles
  static async getAll() {
    try {
      const [roles] = await pool.query("SELECT * FROM user_rol");
      return roles;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para obtener un rol por su id
  static async getById({ id }) {
    try {
      const [rol] = await pool.query(
        "SELECT * FROM user_rol WHERE rol_id = ?",
        [id]
      );
      return rol;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para crear un rol
  static async create({ input }) {
    const { rolName } = input;

    try {
      const [confirmRol] = await pool.query(
        "SELECT * FROM user_rol WHERE rol_name = ?",
        [rolName]
      );
      if (confirmRol.length > 0) {
        throw new Error("El rol ya existe");
      }

      const [result] = await pool.query(
        "INSERT INTO user_rol (rol_name) VALUES (?)",
        [rolName]
      );

      return { id: result.insertId, rolName };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  // Query para actualizar un rol
  static async update({ id, input }) {
    const { rolName } = input;
    
    try {

      const [result] = await pool.query(
        "UPDATE user_rol SET rol_name = ? WHERE rol_id = ?",
        [
          rolName,
          id,
        ]
      );

      return result.affectedRows;
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar el rol");
    }
  }

  // Query para eliminar un rol
  static async delete({ id }) {
    try {
      const [result] = await pool.query(
        "DELETE FROM user_rol WHERE rol_id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el rol");
    }
  }
}
