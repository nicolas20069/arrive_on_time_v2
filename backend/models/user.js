import { pool } from "../config/db.js";
import bycrypt from "bcrypt";

export class UserModel {
  // Query para obtener todos los usuarios
  static async getAll() {
    try {
      const [users] = await pool.query("SELECT * FROM users");
      return users;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para obtener un usuario por su id
  static async getById({ id }) {
    try {
      const [user] = await pool.query("SELECT * FROM users WHERE user_id = ?", [
        id,
      ]);
      return user;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para crear un usuario
  static async create({ input }) {
    try {
      const {
        nombres,
        apellidos,
        edad,
        cedula,
        correo,
        direccion,
        telefono,
        contraseña,
        empresaId,
        rolId,
      } = input;
      const passwordHash = await bycrypt.hash(contraseña, 10);

      const [result] = await pool.query(
        "INSERT INTO users (nombres, apellidos, edad, cedula, correo, direccion, telefono, contraseña, empresa_id, rol_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          nombres,
          apellidos,
          edad,
          cedula,
          correo,
          direccion,
          telefono,
          passwordHash,
          empresaId,
          rolId,
        ]
      );

      const { contraseña: _, ...user } = input;
      return { id: result.insertId, user };
    } catch (error) {
      console.log(error);
      throw new Error("Error al crear el usuario");
    }
  }

  // Query para actualizar un usuario
  static async update({ id, input }) {
    try {
      const {
        nombres,
        apellidos,
        edad,
        cedula,
        correo,
        direccion,
        telefono,
        empresaId,
        rolId,
      } = input;

      const [result] = await pool.query(
        "UPDATE users SET nombres = ?, apellidos = ?, edad = ?, cedula = ?, correo = ?, direccion = ?, telefono = ?, empresa_id = ?, rol_id = ? WHERE user_id = ?",
        [
          nombres,
          apellidos,
          edad,
          cedula,
          correo,
          direccion,
          telefono,
          empresaId,
          rolId,
          id,
        ]
      );

      return result.affectedRows;
    } catch (error) {
      console.log(error);
      throw new Error("Error al actualizar el usuario");
    }
  }

  // Query para eliminar un usuario
  static async delete({ id }) {
    try {
      const [result] = await pool.query("DELETE FROM users WHERE user_id = ?", [
        id,
      ]);
      return result.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar el usuario");
    }
  }
}
