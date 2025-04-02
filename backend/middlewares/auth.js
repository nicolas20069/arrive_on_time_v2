import jwt from "jsonwebtoken";
import { SECRET_JWT_KEY } from "../config/global.js";
import { UserModel } from "../models/user.js";

// Middleware para verificar el token. Si corresponde a un usuario existente en la base de datos.
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"] || req.query.token;
    if (!token)
      return res.status(403).json({ message: "Token no proporcionado" });

    const decoded = jwt.verify(token, SECRET_JWT_KEY);

    const [user] = await UserModel.getById({ id: decoded.userId });
    if (!user) return res.status(404).json({ message: "El usuario no existe" });

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};

// Middleware para verificar si el usuario es administrador
export const isAdmin = async (req, res, next) => {
  try {
    const { userId } = req;

    const [user] = await UserModel.getById({ id: userId });
    if (!user) return res.status(404).json({ message: "El usuario no existe" });

    if (user.rol_name !== "Administrador" || user.rol_id !== 1) return res.status(403).json({ message: "No autorizado" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};
