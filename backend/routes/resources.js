import { Router } from "express";

import { ReoursesController } from "../controllers/resources.js";

export const resourcesRouter = Router();

resourcesRouter.get("/db/:rol_id", ReoursesController.getDB);
resourcesRouter.get("/all-attendances/:rol_id", ReoursesController.getAllAttendances);
resourcesRouter.get("/your-attendances/:id", ReoursesController.getYourAttendances);
