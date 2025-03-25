import { CompanyModel } from "../models/company.js";
import { validateCompany } from "../schemas/companies.js"

export class CompanyController {
  // Método para obtener todos las empresas
  static async getAll(req, res) {
    try {
      const companies = await CompanyModel.getAll();
      res.json(companies);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener las empresas" });
    }
  }

  // Método para obtener una empresa por su id
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const company = await CompanyModel.getById({ id });
      res.json(company);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener la empresa" });
    }
  }

  // Método para crear una empresa siendo administrador
  static async create(req, res) {
    const result = validateCompany(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const company = await CompanyModel.create({ input: result.data });
      res.status(201).json(company);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Método para actualizar una empresa siendo administrador
  static async update(req, res) {
    const { id } = req.params;
    const result = validateCompany(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const [companyFound] = await CompanyModel.getById({ id });
      if (!companyFound) return res.status(404).json({ message: "Empresa para Actualizar no encontrada" });

      const resultCompany = await CompanyModel.update({ id, input: result.data });
      res.status(201).json({ affectedRows: resultCompany });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Método para eliminar una empresa siendo administrador
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const [companyFound] = await CompanyModel.getById({ id });
      if (!companyFound) return res.status(404).json({ message: "Empresa para Eliminar no encontrada" });
      
      const result = await CompanyModel.delete({ id });
      res.json({ affectedRows: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar la empresa" });
    }
  }
}
