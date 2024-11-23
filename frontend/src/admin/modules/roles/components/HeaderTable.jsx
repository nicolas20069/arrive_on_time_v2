import { useState } from "react";
import { Button } from "primereact/button";

import { AddRol } from "./AddRol.jsx";

export function HeaderTable() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="table-header">
        <h2>Roles</h2>
        <Button
          label="Agregar nuevo Rol"
          icon="pi pi-plus"
          size="small"
          className="primary-button"
          style={{ marginRight: ".5em" }}
          onClick={() => setVisible(true)}
        />
      </div>
      <AddRol visible={visible} setVisible={setVisible} />
    </>
  );
}
