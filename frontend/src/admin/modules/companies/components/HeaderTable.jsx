import { useState } from "react";
import { Button } from "primereact/button";

import { AddCompany } from "./AddCompany.jsx";

export function HeaderTable() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="table-header">
        <h2>Empresas</h2>
        <Button
          label="Agregar nueva Empresa"
          icon="pi pi-plus"
          size="small"
          className="primary-button"
          style={{ marginRight: ".5em" }}
          onClick={() => setVisible(true)}
        />
      </div>
      <AddCompany visible={visible} setVisible={setVisible} />
    </>
  );
}
