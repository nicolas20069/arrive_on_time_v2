import { Router } from "express";

import { AttendanceTypeController } from "../controllers/attendancesType.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js";

export const attendancesTypeRouter = Router();

attendancesTypeRouter.get("/", [verifyToken, isAdmin], AttendanceTypeController.getAll);
attendancesTypeRouter.get("/:id", [verifyToken, isAdmin], AttendanceTypeController.getById);

attendancesTypeRouter.post("/", [verifyToken, isAdmin], AttendanceTypeController.create);
attendancesTypeRouter.put("/:id", [verifyToken, isAdmin], AttendanceTypeController.update);
attendancesTypeRouter.delete("/:id", [verifyToken, isAdmin], AttendanceTypeController.delete);
