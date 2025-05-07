import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { HeaderTable } from "./HeaderTable";
import { TableActions } from "./TableActions";
import { Tag } from "primereact/tag";

export function TableAttendances({ attendances }) {
  return (
    <div className="card users-table">
      <DataTable
        value={attendances}
        header={HeaderTable}
        size="small"
        resizableColumns
        showGridlines
        stripedRows
        paginator
        rows={25}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header="#"
          body={(_, rowIndex) => rowIndex.rowIndex + 1}
        ></Column>
        <Column field="fecha" sortable header="Fecha"></Column>
        <Column field="hora" sortable header="Hora"></Column>
        <Column field="nombres" sortable header="Nombres"></Column>
        <Column field="apellidos" sortable header="Apellidos"></Column>
        <Column field="nombre_empresa" sortable header="Empresa"></Column>
        <Column
          body={(attendance) =>
            attendance.tipo_id === 1 ? (
              <Tag value={attendance.tipo_asistencia} severity="success" />
            ) : attendance.tipo_id === 2 ? (
              <Tag value={attendance.tipo_asistencia} severity="danger" />
            ) : attendance.tipo_id === 8 ? (
              <Tag value={attendance.tipo_asistencia} severity="warning" />
            ) : (
              <Tag value={attendance.tipo_asistencia} severity="info" />
            )
          }
          sortable
          header="Tipo de Asistencia"
        ></Column>
        <Column
          header="Acciones"
          body={(attendance) => <TableActions attendance={attendance} />}
        ></Column>
      </DataTable>
    </div>
  );
}
