import { Router } from "express";

import { AuthController } from "../controllers/auth.js";
import { verifyToken } from '../middlewares/auth.js';

export const authRouter = Router();

authRouter.post("/", verifyToken, AuthController.authenticate);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);

