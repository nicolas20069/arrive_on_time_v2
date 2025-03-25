import { UserModel } from "../models/user.js";

export const isAuth = async (req, res, next) => {
  try {
    const { id } = req.params; // id del usuario a consultar
    const { userId } = req; // id del usuario autenticado (obtenido del token)

    const [userToConsult] = await UserModel.getById({ id }); // usuario a consultar
    if (!userToConsult)
      return res.status(404).json({ message: "El usuario no existe" });

    const [user] = await UserModel.getById({ id: userId }); // usuario que hace la petición
    if (!user) return res.status(404).json({ message: "El usuario no existe" });

    if (user.rol_name === "Administrador" || user.rol_id === 1) {
      return next();
    } else if (user.user_id !== userToConsult.user_id) {
      return res.status(403).json({ message: "No autorizado" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "No autorizado" });
  }
};
