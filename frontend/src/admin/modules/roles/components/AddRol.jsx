import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useState, useRef } from "react";

import { createRol } from "../api/roles";

export function AddRol({ visible, setVisible }) {
  const toast = useRef(null);

  const [rolName, setRolName] = useState("");

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

  const handleCreateRol = async (e) => {
    if (
      !rolName
    ) {
      showWarn({ detail: "Porfavor llena todos los campos" });
      return;
    }

    try {
      const rol = await createRol({
        rolName,
        adminId: 1,
      });

      if (rol) {
        showSuccess({ detail: "Rol creado correctamente" });
        setVisible(false);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        showError({ detail: "Error al crear el rol" });
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
        label="Agregar Rol"
        icon="pi pi-check"
        className="primary-button"
        onClick={() => {
          handleCreateRol();
        }}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Dialog
        header="Agregar Nuevo Rol"
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
          <label className="label-form" htmlFor="nombre-rol">
            Nombre del Rol
            <InputText
              id="nombre-rol"
              type="text"
              placeholder="Nombre del Rol"
              required
              value={rolName}
              onChange={(e) => setRolName(e.target.value)}
            />
          </label>
        </form>
      </Dialog>
    </div>
  );
}
