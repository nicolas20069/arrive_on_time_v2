import { Router } from "express";

import { ResourcesController } from "../controllers/resources.js";
import { verifyToken, isAdmin} from '../middlewares/auth.js';

export const resourcesRouter = Router();

resourcesRouter.get("/db", [verifyToken, isAdmin], ResourcesController.getDB);
resourcesRouter.get("/all-attendances", [verifyToken, isAdmin], ResourcesController.getAllAttendances);
resourcesRouter.get("/your-attendances", verifyToken, ResourcesController.getYourAttendances);
