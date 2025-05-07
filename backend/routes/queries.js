import { Router } from "express";

import { QueriesController } from "../controllers/queries.js";
import { verifyToken, isAdmin} from '../middlewares/auth.js';

export const queriesRouter = Router();

queriesRouter.get("/uno", /* [verifyToken, isAdmin], */ QueriesController.queryUno);
queriesRouter.get("/dos", /* [verifyToken, isAdmin], */ QueriesController.queryDos);
