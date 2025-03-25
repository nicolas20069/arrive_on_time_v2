import { Router } from "express";

import { ResourcesController } from "../controllers/resources.js";
import { verifyToken, isAdmin} from '../middlewares/auth.js';

export const resourcesRouter = Router();

resourcesRouter.get("/db/:rol_id/:user_id", [verifyToken, isAdmin], ResourcesController.getDB);
resourcesRouter.get("/all-attendances/:rol_id/:user_id", [verifyToken, isAdmin], ResourcesController.getAllAttendances);
resourcesRouter.get("/your-attendances/:id", verifyToken, ResourcesController.getYourAttendances);
