import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { SECRET_JWT_KEY } from "../config/global.js";

export class AuthController {
  static async login(req, res) {
    const { cedula, contraseña } = req.body;

    if (!cedula || !contraseña) {
      return res
        .status(400)
        .json({ message: "Cedula y contraseña son requeridos" });
    }

    try {
      const user = await UserModel.login({ cedula, contraseña });
      const {
        user_id,
        nombres,
        apellidos,
        edad,
        correo,
        direccion,
        telefono,
        empresa_id,
        rol_id,
      } = user;

      const token = jwt.sign(
        {
          user_id,
          nombres,
          apellidos,
          edad,
          cedula: user.cedula,
          correo,
          direccion,
          telefono,
          empresa_id,
          rol_id,
        },
        SECRET_JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ message: "Sesion iniciada", user, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
