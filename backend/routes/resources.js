import { Router } from "express";

import { ResourcesController } from "../controllers/resources.js";

export const resourcesRouter = Router();

resourcesRouter.get("/db/:rol_id", ResourcesController.getDB);
resourcesRouter.get("/all-attendances/:rol_id", ResourcesController.getAllAttendances);
resourcesRouter.get("/your-attendances/:id", ResourcesController.getYourAttendances);
