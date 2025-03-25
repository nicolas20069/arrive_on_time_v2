import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { SECRET_JWT_KEY } from "../config/global.js";

export class AuthController {
  // Metodo para iniciar sesion
  static async login(req, res) {
    const { cedula, contraseña } = req.body;

    if (!cedula || !contraseña) {
      return res
        .status(400)
        .json({ message: "Cedula y contraseña son requeridos" });
    }

    try {
      const user = await UserModel.login({ cedula, contraseña });
      const { user_id } = user;

      const token = jwt.sign({
          userId: user_id,
        },
        SECRET_JWT_KEY,
        { expiresIn: 86400 } // Expira en 24 horas
      );

      res.status(200).json({ message: "Sesion iniciada", token, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}
