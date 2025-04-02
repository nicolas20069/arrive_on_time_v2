import { Router } from "express";
import passport from "passport";

import { AuthController } from "../controllers/auth.js";
import { verifyToken } from '../middlewares/auth.js';
import '../middlewares/authGoogle.js';

export const authRouter = Router();

authRouter.get("/login/google", passport.authenticate("auth-google", {
    scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
    ],
    session: false,
}), AuthController.loginGoogle);

authRouter.post("/", verifyToken, AuthController.authenticate);
authRouter.post("/login", AuthController.login);
authRouter.post("/logout", AuthController.logout);

