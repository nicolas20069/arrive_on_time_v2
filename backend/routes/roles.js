import { Router } from "express";

import { RoleController } from "../controllers/roles.js";

export const rolesRouter = Router();

rolesRouter.get("/", RoleController.getAll);
rolesRouter.get("/:id", RoleController.getById);

rolesRouter.post("/", RoleController.create);
rolesRouter.put("/:id", RoleController.update);
rolesRouter.delete("/:id", RoleController.delete);
