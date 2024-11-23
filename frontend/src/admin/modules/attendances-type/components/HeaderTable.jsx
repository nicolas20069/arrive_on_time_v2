import { useState } from "react";
import { Button } from "primereact/button";

import { AddAttendanceType } from "./AddAttendanceType.jsx";

export function HeaderTable() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="table-header">
        <h2>Roles</h2>
        <Button
          label="Agregar nuevo tipo de asistencia"
          icon="pi pi-plus"
          size="small"
          className="primary-button"
          style={{ marginRight: ".5em" }}
          onClick={() => setVisible(true)}
        />
      </div>
      <AddAttendanceType visible={visible} setVisible={setVisible} />
    </>
  );
}
