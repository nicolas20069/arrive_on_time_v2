import { useState } from "react";
import { Button } from "primereact/button";

import { AddAttendance } from "./AddAttendance.jsx";

export function HeaderTable() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="table-header">
        <h2>Asistencias</h2>
        <Button
          label="Agregar Asistencia"
          icon="pi pi-plus"
          size="small"
          className="primary-button"
          style={{ marginRight: ".5em" }}
          onClick={() => setVisible(true)}
        />
      </div>
      <AddAttendance visible={visible} setVisible={setVisible} />
    </>
  );
}
