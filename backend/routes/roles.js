import { Router } from "express";

import { RoleController } from "../controllers/roles.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

export const rolesRouter = Router();

rolesRouter.get("/", [verifyToken, isAdmin], RoleController.getAll);
rolesRouter.get("/:id", [verifyToken, isAdmin], RoleController.getById);

rolesRouter.post("/", [verifyToken, isAdmin], RoleController.create);
rolesRouter.put("/:id", [verifyToken, isAdmin], RoleController.update);
rolesRouter.delete("/:id", [verifyToken, isAdmin], RoleController.delete);
