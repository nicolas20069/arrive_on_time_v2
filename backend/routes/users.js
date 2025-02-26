import { Router } from "express";
import multer from "multer";

import { UserController } from "../controllers/users.js";

export const usersRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

usersRouter.get("/", UserController.getAll);
usersRouter.get("/admins", UserController.getAdmins);
usersRouter.get("/:id", UserController.getById);

usersRouter.post("/", UserController.create);
usersRouter.post("/image-profile/:id", upload.single("user_img_profile"), UserController.setImageProfile);
usersRouter.post("/image-profile-db/:id", upload.single("user_img_profile"), UserController.setImageProfileDB);
usersRouter.put("/:id", UserController.update);
usersRouter.delete("/:id", UserController.delete);
