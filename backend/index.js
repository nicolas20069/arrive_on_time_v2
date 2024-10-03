import express from "express";
import cors from "cors";

import { PORT } from "./config/global.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/users", (req, res) => {
  res.send("ruta para obtener todos los usuarios");
});

app.post("/users", (req, res) => {
  res.send("ruta para crear un usario (siendo admin)");
});

app.put("/users", (req, res) => {
  res.send("ruta para actualizar un usuario");
});

app.delete("/users", (req, res) => {
  res.send("ruta para eliminar un usuario (siendo admin)");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
