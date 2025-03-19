import { Router } from "express";

import { ResourcesController } from "../controllers/resources.js";

export const resourcesRouter = Router();

resourcesRouter.get("/db/:rol_id/:user_id", ResourcesController.getDB);
resourcesRouter.get("/all-attendances/:rol_id/:user_id", ResourcesController.getAllAttendances);
resourcesRouter.get("/your-attendances/:id", ResourcesController.getYourAttendances);
