import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { HeaderTable } from "./HeaderTable";
import { TableActions } from "./TableActions";

export function TableAttendencesType({ attendancesType }) {
  return (
    <div className="card users-table">
      <DataTable
        value={attendancesType}
        header={HeaderTable}
        size="small"
        resizableColumns
        showGridlines
        stripedRows
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header="#"
          body={(_, rowIndex) => rowIndex.rowIndex + 1}
        ></Column>
        <Column field="tipo_asistencia" sortable header="Tipo de Asistencia"></Column>
        <Column
          header="Acciones"
          body={(attendanceType) => <TableActions attendanceType={attendanceType} />}
        ></Column>
      </DataTable>
    </div>
  );
}
