import express from "express";
import cors from "cors";

import { PORT } from "./config/global.js";
import { usersRouter } from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

app.use('/users', usersRouter)

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
