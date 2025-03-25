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

      const token = jwt.sign(
        {
          userId: user.user_id,
        },
        SECRET_JWT_KEY,
        { expiresIn: 86400 } // Expira en 24 horas
      );

      res.cookie("token", token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      });
      res.status(200).json({ message: "Sesion iniciada", user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Metodo para cerrar sesion
  static async logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Sesion cerrada" });
  }
}
