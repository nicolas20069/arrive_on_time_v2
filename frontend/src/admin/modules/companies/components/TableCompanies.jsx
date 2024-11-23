import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { HeaderTable } from "./HeaderTable";
import { TableActions } from "./TableActions";

export function TableCompanies({ companies }) {
  return (
    <div className="card users-table">
      <DataTable
        value={companies}
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
        <Column field="nombre_empresa" sortable header="Empresa"></Column>
        <Column field="admin_id" header="Id Administrador"></Column>
        <Column field="nombres" header="Nombre Administrador"></Column>
        <Column field="apellidos" header="Apellidos Administrador"></Column>
        <Column field="cedula" header="Cedula Administrador"></Column>
        <Column
          header="Acciones"
          body={(company) => <TableActions company={company} />}
        ></Column>
      </DataTable>
    </div>
  );
}
