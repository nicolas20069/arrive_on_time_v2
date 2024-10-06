import { UserModel } from "../models/user.js";
import { validateUser, validateUserUpdate } from "../schemas/users.js";

export class UserController {
  // Método para obtener todos los usuarios
  static async getAll(req, res) {
    try {
      const users = await UserModel.getAll();
      res.json(users);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  }

  // Método para obtener un usuario por su id
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await UserModel.getById({ id });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }

  // Método para crear un usuario siendo administrador
  static async create(req, res) {
    const result = validateUser(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    // Validar que el usuario que esta creando el nuevo usuario sea un administrador
    if (result.data.adminId != 1) {
      return res
        .status(400)
        .json({ message: "No tienes permisos para crear usuarios" });
    }

    try {
      const user = await UserModel.create({ input: result.data });
      res.status(201).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al crear el usuario" });
    }
  }

  // Método para actualizar un usuario siendo administrador
  static async update(req, res) {
    const { id } = req.params;
    const result = validateUserUpdate(req.body);

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }

    // Validar que el usuario que esta creando el nuevo usuario sea un administrador
    if (result.data.adminId != 1) {
      return res
        .status(400)
        .json({ message: "No tienes permisos para actualizar usuarios" });
    }

    try {
      const resultUser = await UserModel.update({ id, input: result.data });
      res.status(201).json({ affectedRows: resultUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  // Método para eliminar un usuario siendo administrador
  static async delete(req, res) {
    const { id } = req.params;

    try {
      const result = await UserModel.delete({ id });
      res.json({ affectedRows: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  }
}
