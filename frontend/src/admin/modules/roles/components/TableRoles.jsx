import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { HeaderTable } from "./HeaderTable";
import { TableActions } from "./TableActions";

export function TableRoles({ roles }) {
  return (
    <div className="card users-table">
      <DataTable
        value={roles}
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
        <Column field="rol_name" sortable header="Nombre del Rol"></Column>
        <Column
          header="Acciones"
          body={(rol) => <TableActions rol={rol} />}
        ></Column>
      </DataTable>
    </div>
  );
}
