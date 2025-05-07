import { pool } from "../config/db.js";
import { queryUno, queryDos } from "./queries/query.js"

export class QueryModel {
    // Obtener el o los usuarios que han registrado más asistencias del tipo "Entrada"
    static async queryUno () {
        try {
            const [data] = await pool.query(queryUno)
            return data
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    // Obtener los usuarios que tienen asistencia de tipo entrada registrada en la 
    // tabla asistencia y que su hora de entrada es menor a las 16:30:00.
    static async queryDos () {
        try {
            const [data] = await pool.query(queryDos)
            return data
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}