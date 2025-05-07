export function QueryResults({ queryResult }) {
    return (
        <div>
            {
                queryResult && (
                    <div className="query-result">
                        <h3>Resultado de la consulta</h3>

                        <ol>
                            {
                                queryResult.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {JSON.stringify(item)}
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                )
            }
        </div>
    )

}