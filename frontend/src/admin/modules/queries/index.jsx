import "./styles/main.css"

import { Header } from "../../includes/Header.jsx";
import { QueryForm } from "./components/QueryForm.jsx";

export function Queries() {
    return (
        <>
            <Header />

            <section className="queries">
                <main className="queries-main">
                    <h1>Realizar Consultas</h1>
                    <p>Esta sección te permite realizar diversas consultas sobre tus usuarios.</p>

                    <QueryForm />
                </main>
            </section>
        </>
    )
}