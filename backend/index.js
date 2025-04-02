import express from "express";
import cors from "cors";
import passport from "passport";

import { FRONTEND_URL, PORT } from "./config/global.js";
import { usersRouter } from "./routes/users.js";
import { rolesRouter } from "./routes/roles.js";
import { companiesRouter } from "./routes/companies.js";
import { attendanceRouter } from "./routes/attendance.js";
import { attendancesTypeRouter } from "./routes/attendancesType.js";
import { authRouter } from "./routes/auth.js";
import { resourcesRouter } from "./routes/resources.js";

const app = express();
app.use(express.json());
app.use(passport.initialize());
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.disable("x-powered-by");

// Ruta para gestionar el login
app.use('/auth', authRouter)

// Rutas para gestionar los modulos 
app.use('/users', usersRouter)
app.use('/roles', rolesRouter)
app.use('/companies', companiesRouter)
app.use('/attendances', attendanceRouter)
app.use('/attendances-type', attendancesTypeRouter)

// Rutas para gestionar la descarga de recursos
app.use('/resources', resourcesRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en: http://localhost:${PORT}`);
});
