import { Router } from "express";

import { CompanyController } from "../controllers/companies.js";
import { verifyToken, isAdmin } from "../middlewares/auth.js"

export const companiesRouter = Router();

companiesRouter.get("/", [verifyToken, isAdmin], CompanyController.getAll);
companiesRouter.get("/:id", [verifyToken, isAdmin], CompanyController.getById);

companiesRouter.post("/", [verifyToken, isAdmin], CompanyController.create);
companiesRouter.put("/:id", [verifyToken, isAdmin], CompanyController.update);
companiesRouter.delete("/:id", [verifyToken, isAdmin], CompanyController.delete);
