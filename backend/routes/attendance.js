import { Router } from "express";

import { AttendanceController } from "../controllers/attendance.js";
import { verifyToken, isAdmin } from '../middlewares/auth.js';

export const attendanceRouter = Router();

attendanceRouter.get("/", [verifyToken, isAdmin], AttendanceController.getAll);
attendanceRouter.get("/:id", [verifyToken, isAdmin], AttendanceController.getById);
attendanceRouter.get("/user/:userId", [verifyToken], AttendanceController.getByUserId);

attendanceRouter.post("/", [verifyToken, isAdmin], AttendanceController.create);
attendanceRouter.put("/:id", [verifyToken, isAdmin], AttendanceController.update);
attendanceRouter.delete("/:id", [verifyToken, isAdmin], AttendanceController.delete);
