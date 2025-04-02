import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js";
import { SECRET_JWT_KEY, FRONTEND_URL } from "../config/global.js";

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
      const user = await UserModel.getByCC({ cedula, contraseña });

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

  // Metodo para iniciar sesion con google
  static async loginGoogle(req, res){
    try {
      if (!req.user) {
        return res.status(400).json({ message: "No se pudo iniciar sesión con Google" });
      }

      const { value: email } = req.user.emails[0];

      if (!email) {
        return res.status(400).json({ message: "No se logro iniciar sesion con google" });
      }

      const user = await UserModel.getByEmail({ email });

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
  
      const redirectUrl = user.rol_id !== 1 ? `${FRONTEND_URL}/user` : `${FRONTEND_URL}/admin`;
      res.redirect(redirectUrl);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  // Metodo para autenticar al usuario segun su rol
  static async authenticate(req, res) {
    const { userId } = req

    const [user] = await UserModel.getById({ id: userId });
    if (!user) return res.status(404).json({ message: "El usuario no existe" });

    res.status(200).json({ message: "Autenticado", rolId: user.rol_id, userId: user.user_id });
  }

  // Metodo para cerrar sesion
  static async logout(req, res) {
    res.clearCookie("token");
    res.status(200).json({ message: "Sesion cerrada" });
  }
}
