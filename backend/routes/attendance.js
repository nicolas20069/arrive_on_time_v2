import { Router } from "express";

import { AttendanceController } from "../controllers/attendance.js";

export const attendanceRouter = Router();

attendanceRouter.get("/", AttendanceController.getAll);
attendanceRouter.get("/:id", AttendanceController.getById);
attendanceRouter.get("/user/:userId", AttendanceController.getByUserId);

attendanceRouter.post("/", AttendanceController.create);
attendanceRouter.put("/:id", AttendanceController.update);
attendanceRouter.delete("/:id", AttendanceController.delete);
