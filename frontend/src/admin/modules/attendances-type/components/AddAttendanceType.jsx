import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useState, useRef } from "react";

import { createAttendanceType } from "../api/attendances-type.js";

export function AddAttendanceType({ visible, setVisible }) {
  const toast = useRef(null);

  const [attendanceTypeName, setAttendancesTypeName] = useState("");

  const showSuccess = ({ detail }) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail,
      life: 3000,
    });
  };

  const showWarn = ({ detail }) => {
    toast.current.show({
      severity: "warn",
      summary: "Warning",
      detail,
      life: 3000,
    });
  };

  const showError = ({ detail }) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail,
      life: 3000,
    });
  };

  const handleCreateAttendanceType = async (e) => {
    if (
      !attendanceTypeName
    ) {
      showWarn({ detail: "Porfavor llena todos los campos" });
      return;
    }

    try {
      const attendanceType = await createAttendanceType({
        attendanceTypeName,
        adminId: 1,
      });

      if (attendanceType) {
        showSuccess({ detail: "Tipo de asistencia creado correctamente" });
        setVisible(false);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        showError({ detail: "Error al crear el tipo de asistencia" });
      }
    } catch (error) {
      showError({
        detail: error.message
      });
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
        severity="secondary"
      />
      <Button
        label="Agregar Tipo de Asistencia"
        icon="pi pi-check"
        className="primary-button"
        onClick={() => {
          handleCreateAttendanceType();
        }}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Dialog
        header="Agregar Nuevo Tipo de Asistencia"
        visible={visible}
        style={{ width: "50vw" }}
        draggable={false}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <form id="add-user-form" className="add-user-form">
          <label className="label-form" htmlFor="nombre-tipo-asistencia">
            Nombre del Tipo de Asistencia
            <InputText
              id="nombre-tipo-asistencia"
              type="text"
              placeholder="Nombre del Tipo de Asistencia"
              required
              value={attendanceTypeName}
              onChange={(e) => setAttendancesTypeName(e.target.value)}
            />
          </label>
        </form>
      </Dialog>
    </div>
  );
}
