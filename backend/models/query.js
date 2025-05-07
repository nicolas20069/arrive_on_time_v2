import { pool } from "../config/db.js";
import { queryUno } from "./queries/query.js"

export class QueryModel {
    // Query para obtener el o los usuarios que han registrado más asistencias del tipo "Entrada"
    static async queryUno () {
        try {
            const [data] = await pool.query(queryUno)
            return data
        } catch (error) {
            console.error(error);
            return [];
        }
    }
}