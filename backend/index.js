import express from "express";
import cors from "cors";

import { FRONTEND_URL, PORT } from "./config/global.js";
import { usersRouter } from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(cors(FRONTEND_URL));
app.disable("x-powered-by");

app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
