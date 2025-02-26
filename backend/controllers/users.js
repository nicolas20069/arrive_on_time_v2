import { UserModel } from "../models/user.js";
import { validateUser, validateUserUpdate } from "../schemas/users.js";
import { v2 as cloudinary } from "cloudinary";
import { cloudinaryConfig } from "../config/cloudinary.js";

cloudinary.config(cloudinaryConfig);
export class UserController {
  // Método para obtener todos los usuarios
  static async getAll(req, res) {
    try {
      const users = await UserModel.getAll();

      const publicUsers = users.map((user) => {
        const { contraseña: _, ...publicUser } = user;
        return publicUser;
      });

      res.json(publicUsers);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  }

  // Método para obtener todos los usuarios administradores
  static async getAdmins(req, res) {
    try {
      const users = await UserModel.getAdmins();

      const publicUsers = users.map((user) => {
        const { contraseña: _, ...publicUser } = user;
        return publicUser;
      });

      res.json(publicUsers);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Error al obtener los usuarios administradores" });
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
      res.status(500).json({ message: error.message });
    }
  }

  // Método para establecer la imagen de perfil de un usuario
  static async setImageProfile(req, res) {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Imagen no encontrada" });
    }

    const { buffer } = req.file;

    // Subir la imagen a cloudinary
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({
            folder: "arrive_on_time",
          },
          (err, result) => {
            if (err) reject(err);
            resolve(result);
          }
        )
        .end(buffer);
    });

    try {
      const result = await UserModel.setImageProfile({
        id,
        imageUrl: response.url,
      });
      res.json({ message: "Imagen subida con éxito", affectedRows: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al subir la imagen" });
    }
  }

  // Metodo para guardar la imagen de perfil en la base de datos
  static async setImageProfileDB(req, res) {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: "Imagen no encontrada" });
    }

    const { buffer } = req.file;

    try {
      const result = await UserModel.setImageProfileDB({
        id,
        imageData: buffer,
      });
      res.json({ message: "Imagen subida con éxito", affectedRows: result });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al subir la imagen" });
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
      res.status(201).json({
        message: "Usuario actualizado correctamente",
        affectedRows: resultUser,
      });
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
      res.json({
        message: "Usuario eliminado correctamente",
        affectedRows: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al eliminar el usuario" });
    }
  }
}
