import { QueryModel } from "../models/query.js"

export class QueriesController {
    static async queryUno(req, res) {
        res.status(200).json({ message: "Funciona query 1", data: [
            {
                id: 1,
                name: "John"
            },
            {
                id: 2,
                name: "Jane"
            }
        ]})
    }

    static async queryDos(req, res) {
        res.status(200).json({ message: "Funciona query 2", data: [
            {
                id: 3,
                name: "John"
            },
            {
                id: 4,
                name: "Jane"
            }
        ]})
    }
}