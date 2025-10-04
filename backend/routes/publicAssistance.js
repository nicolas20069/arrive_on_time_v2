import express from 'express';
// Importa los controladores de asistencias que creamos previamente
import { recordAssistance, getAssistanceHistory } from '../controllers/assistanceController.js'; 

const publicRouter = express.Router();

// Ruta para registrar una nueva asistencia (entrada/salida)
publicRouter.post('/record', recordAssistance);

// Ruta para obtener el historial de asistencia de un empleado
publicRouter.get('/:employeeId', getAssistanceHistory);


export default publicRouter;