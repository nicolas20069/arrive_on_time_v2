import { Router } from "express";

import { CompanyController } from "../controllers/companies.js";

export const companiesRouter = Router();

companiesRouter.get("/", CompanyController.getAll);
companiesRouter.get("/:id", CompanyController.getById);

companiesRouter.post("/", CompanyController.create);
companiesRouter.put("/:id", CompanyController.update);
companiesRouter.delete("/:id", CompanyController.delete);
