import { QueryModel } from "../models/query.js"

export class QueriesController {
    static async queryUno(req, res) {
        try {
            const data = await QueryModel.queryUno()
            res.json(data);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Error al obtener la consulta uno" });
        }
    }
}