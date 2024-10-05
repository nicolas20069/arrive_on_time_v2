import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { HeaderTable } from "./HeaderTable";
import { TableActions } from "./TableActions";

export function TableUsers({ users }) {
  return (
    <div className="card users-table">
      <DataTable
        value={users}
        header={HeaderTable}
        size="small"
        resizableColumns
        showGridlines
        stripedRows
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: "50rem" }}
      >
        <Column
          header="#"
          body={(_, rowIndex) => rowIndex.rowIndex + 1}
        ></Column>
        <Column field="nombres" sortable header="Nombres"></Column>
        <Column field="apellidos" header="Apellidos"></Column>
        <Column field="cedula" header="Cedula"></Column>
        <Column field="correo" header="Correo"></Column>
        <Column field="edad" header="Edad"></Column>
        <Column field="direccion" header="Direccion"></Column>
        <Column field="telefono" header="Telefono"></Column>
        <Column field="empresa_id" header="Empresa"></Column>
        <Column field="rol_id" header="Rol"></Column>
        <Column header="Acciones" body={TableActions}></Column>
      </DataTable>
    </div>
  );
}
