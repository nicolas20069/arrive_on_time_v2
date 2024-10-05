import { Button } from "primereact/button";

export function TableActions() {
  return (
    <div>
      <Button
        label="Editar"
        icon="pi pi-pencil"
        size="small"
        className="p-button-success"
        style={{ marginRight: ".5em" }}
        onClick={() => {}}
      />
      <Button
        label="Eliminar"
        icon="pi pi-trash"
        size="small"
        className="p-button-danger"
        onClick={() => {}}
      />
    </div>
  );
}
