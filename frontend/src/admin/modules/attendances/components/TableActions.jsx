import React, { useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { UpdateAttendance } from "./UpdateAttendance.jsx";

export function TableActions({ attendance }) {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  const deleteAttendanceDialog = () => {
    setVisible(true);
  };

  const reject = () => {
    setVisible(false);
  };

  const accept = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/attendances/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      setVisible(false);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la asistencia:", error);

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al eliminar la asistencia",
        life: 3000,
      });

      setVisible(false);
    }
  };

  return (
    <div>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={visible}
        onHide={() => setVisible(false)}
        draggable={false}
        resizable={false}
        header="Eliminar Asistencia"
        message={`¿Deseas eliminar la asistencia de: ${attendance.nombres}?`}
        icon="pi pi-exclamation-triangle"
        acceptClassName="p-button-danger"
        rejectClassName="p-button-secondary p-button-text"
        accept={() => {
          accept(attendance.asistencia_id);
        }}
        reject={reject}
        acceptLabel="Eliminar"
        rejectLabel="Cancelar"
      />

      <Button
        icon="pi pi-pencil"
        size="small"
        className="secondary-button"
        tooltip="Editar Asistencia"
        tooltipOptions={{ position: "bottom" }}
        style={{ marginRight: ".5em" }}
        onClick={() => setUpdateVisible(true)}
      />
      <Button
        icon="pi pi-trash"
        size="small"
        className="danger-button"
        tooltip="Eliminar Asistencia"
        tooltipOptions={{ position: "bottom" }}
        onClick={deleteAttendanceDialog}
      />

      <UpdateAttendance
        visible={updateVisible}
        setVisible={setUpdateVisible}
        attendance={attendance}
      />
    </div>
  );
}
