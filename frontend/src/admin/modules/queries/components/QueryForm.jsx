import "../styles/query-form.css"
import { useState, useRef } from "react";

import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

import { queryOptions } from "../constants/queryOptions.js"
import { getQueries } from "../api/queries.js"
import { TOAST_SEVERITY, TOAST_SUMMARY } from "../constants/toastConfig.js";
import { QueryResults } from "./QueryResults.jsx";

export function QueryForm() {
    const toast = useRef(null);

    const [selectQuery, setSelectQuery] = useState(null);
    const [queryResult, setQueryResult] = useState(null);

    const showToast = ({ detail, severity, summary }) => {
        toast.current.show({
            severity,
            summary,
            detail,
            life: 3000,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectQuery) {
            showToast({
                detail: "Porfavor selecciona una consulta",
                severity: TOAST_SEVERITY.warn,
                summary: TOAST_SUMMARY.warn
            });

            return
        };

        try {
            const res = await getQueries({ queryId: selectQuery })
            setQueryResult(res.data);

        } catch (error) {
            showToast({
                detail: "Error al realizar la consulta",
                severity: TOAST_SEVERITY.error,
                summary: TOAST_SUMMARY.error
            });
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <form id="query-form" onSubmit={handleSubmit}>
                <Dropdown
                    id="query-option"
                    value={selectQuery}
                    options={queryOptions}
                    optionLabel="label"
                    onChange={(e) => setSelectQuery(e.value)}
                    placeholder="Selecciona una consulta"
                    required
                />

                <Button
                    type="submit"
                    label="Consultar"
                    icon="pi pi-search"
                    className="primary-button"
                />
            </form>


            <QueryResults queryResult={queryResult} />
        </>
    )
}