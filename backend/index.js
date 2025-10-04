import https from 'node:https'
import fs from 'node:fs'

import express from "express";
import cors from "cors";
import passport from "passport";

import { FRONTEND_URL, PORT } from "./config/global.js";

// ----------------------------------------------------
// Importación de tu nuevo router de asistencias públicas
import publicAssistanceRouter from './routes/publicAssistance.js';
// ----------------------------------------------------
import { usersRouter } from "./routes/users.js";
import { rolesRouter } from "./routes/roles.js";
import { companiesRouter } from "./routes/companies.js";
import { attendanceRouter } from "./routes/attendance.js";
import { attendancesTypeRouter } from "./routes/attendancesType.js";
import { authRouter } from "./routes/auth.js";
import { resourcesRouter } from "./routes/resources.js";
import { queriesRouter } from './routes/queries.js';

const app = express();
app.use(express.json());
app.use(passport.initialize());
const allowedOrigins = [
  'https://localhost:5173', // Tu app principal de React
  'https://localhost:3000'  // Tu nuevo módulo de Vue
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));
app.disable("x-powered-by");

// Ruta para gestionar el login
app.use('/auth', authRouter)

// ----------------------------------------------------
// Rutas PÚBLICAS sin autenticación
// Se utilizan para el nuevo módulo de Vue.js de registro de asistencias.
// Es crucial que esta ruta NO esté protegida por ningún middleware de token.
app.use('/public/attendances', publicAssistanceRouter)
// ----------------------------------------------------

// Rutas para gestionar los modulos (Estas deben seguir estando protegidas)
app.use('/users', usersRouter)
app.use('/roles', rolesRouter)
app.use('/companies', companiesRouter)
app.use('/attendances', attendanceRouter)
app.use('/attendances-type', attendancesTypeRouter)

// Rutas para gestionar la descarga de recursos
app.use('/resources', resourcesRouter)

// Ruta para gestionar las consultas de datos
app.use('/queries', queriesRouter)

// configuracion para habilitar https
const httpsOptions = {
    key: fs.readFileSync("./ssl/localhost-key.pem"),
    cert: fs.readFileSync("./ssl/localhost.pem")
}

// Crear servidor https
https.createServer(httpsOptions, app).listen(PORT, () => {
    console.log(`Servidor corriendo en: https://localhost:${PORT}`);
})

// Servidor http
/* app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
}); */