const token = document.cookie.split("=")[1];

export async function getQueries({ queryId }) {
    if (!queryId) {
        throw new Error("No hay una consulta seleccionada");
    }

    const response = await fetch(`https://localhost:5000/queries/${queryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
        },
    });

    if (!response.ok) {
        throw new Error("Error al realizar la consulta");
    }

    const data = await response.json();
    return data;
}