import { pool } from "../config/db.js";

export class CompanyModel {
  // Query para obtener todos las empresas
  static async getAll() {
    try {
      const [companies] = await pool.query("SELECT * FROM empresas");
      return companies;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para obtener una empresa por su id
  static async getById({ id }) {
    try {
      const [company] = await pool.query(
        "SELECT * FROM empresas WHERE empresa_id = ?",
        [id]
      );
      return company;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  // Query para crear una empresa
  static async create({ input }) {
    const { companyName, userAdminId } = input;

    try {
      const [confirmCompany] = await pool.query(
        "SELECT * FROM empresas WHERE nombre_empresa = ?",
        [companyName]
      );

      if (confirmCompany.length > 0) {
        throw new Error("La empresa ya existe");
      }

      const [result] = await pool.query(
        "INSERT INTO empresas (nombre_empresa, admin_id) VALUES (?, ?)",
        [companyName, userAdminId]
      );

      return { id: result.insertId, companyName, userAdminId };
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  // Query para actualizar una empresa
  static async update({ id, input }) {
    const { companyName, userAdminId } = input;

    try {
      const [confirmCompany] = await pool.query(
        "SELECT * FROM empresas WHERE nombre_empresa = ?",
        [companyName]
      );

      if (confirmCompany.length > 0) {
        throw new Error("La empresa ya existe");
      }

      const [result] = await pool.query(
        "UPDATE empresas SET nombre_empresa = ?, admin_id = ? WHERE empresa_id = ?",
        [companyName, userAdminId, id]
      );

      return result.affectedRows;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  // Query para eliminar una empresa
  static async delete({ id }) {
    try {
      const [result] = await pool.query(
        "DELETE FROM empresas WHERE empresa_id = ?",
        [id]
      );
      return result.affectedRows;
    } catch (error) {
      console.error(error);
      throw new Error("Error al eliminar la empresa");
    }
  }
}
