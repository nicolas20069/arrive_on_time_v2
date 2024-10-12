import { Router } from "express";

import { AttendanceTypeController } from "../controllers/attendancesType.js";

export const attendancesTypeRouter = Router();

attendancesTypeRouter.get("/", AttendanceTypeController.getAll);
attendancesTypeRouter.get("/:id", AttendanceTypeController.getById);

attendancesTypeRouter.post("/", AttendanceTypeController.create);
attendancesTypeRouter.put("/:id", AttendanceTypeController.update);
attendancesTypeRouter.delete("/:id", AttendanceTypeController.delete);
