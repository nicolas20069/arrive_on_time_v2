import { RolModel } from "../models/rol.js";
import { validateRol } from "../schemas/roles.js"

export class RoleController {
  // Método para obtener todos los roles
  static async getAll(req, res) {
    try {
      const roles = await RolModel.getAll();
      res.json(roles);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los roles" });
    }
  }

  // Método para obtener un rol por su id
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const rol = await RolModel.getById({ id });
      res.json(rol);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el rol" });
    }
  }

  // Método para crear un rol siendo administrador
  static async create(req, res) {
    const result = validateRol(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const rol = await RolModel.create({ input: result.data });
      res.status(201).json(rol);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Método para actualizar un rol siendo administrador
  static async update(req, res) {
    const { id } = req.params;
    const result = validateRol(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const [rolFound] = await RolModel.getById({ id });
      if (!rolFound) return res.status(404).json({ message: "Rol para Actualizar no Encontrado" });
      
      const resultRol = await RolModel.update({ id, input: result.data });
      res.status(201).json({ affectedRows: resultRol });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  // Método para eliminar un rol siendo administrador
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const [rolFound] = await RolModel.getById({ id });
      if (!rolFound) return res.status(404).json({ message: "Rol para Eliminar no Encontrado" });
      
      const result = await RolModel.delete({ id });
      res.json({ affectedRows: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el rol" });
    }
  }
}
