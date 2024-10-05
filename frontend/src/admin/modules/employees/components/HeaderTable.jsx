import { useState } from "react";
import { Button } from "primereact/button";

import { AddUser } from "./AddUser.jsx";

export function HeaderTable() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="table-header">
        <h2>Usuarios</h2>
        <Button
          label="Agregar Usuario"
          icon="pi pi-plus"
          size="small"
          style={{ marginRight: ".5em" }}
          onClick={() => setVisible(true)}
        />
      </div>
      <AddUser visible={visible} setVisible={setVisible} />
    </>
  );
}
