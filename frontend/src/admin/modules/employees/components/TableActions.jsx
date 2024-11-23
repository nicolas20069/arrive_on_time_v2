import React, { useRef, useState } from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

import { UpdateUser } from "./UpdateUser.jsx";

export function TableActions({ user }) {
  const toast = useRef(null);
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

  const deleteUserDialog = () => {
    setVisible(true);
  };

  const reject = () => {
    setVisible(false);
  };

  const accept = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
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
      console.error("Error al eliminar el usuario:", error);

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al Eliminar el Usuario",
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
        header="Eliminar Usuario"
        message={`¿Deseas borrar al usuario ${user.nombres} ${user.apellidos}?`}
        icon="pi pi-exclamation-triangle"
        acceptClassName="p-button-danger"
        rejectClassName="p-button-secondary p-button-text"
        accept={() => {
          accept(user.user_id);
        }}
        reject={reject}
        acceptLabel="Eliminar"
        rejectLabel="Cancelar"
      />

      <Button
        icon="pi pi-pencil"
        size="small"
        className="secondary-button"
        tooltip="Editar Usuario"
        tooltipOptions={{ position: "bottom" }}
        style={{ marginRight: ".5em" }}
        onClick={() => setUpdateVisible(true)}
      />
      <Button
        icon="pi pi-trash"
        size="small"
        className="danger-button"
        tooltip="Eliminar Usuario"
        tooltipOptions={{ position: "bottom" }}
        onClick={deleteUserDialog}
      />

      <UpdateUser
        visible={updateVisible}
        setVisible={setUpdateVisible}
        user={user}
      />
    </div>
  );
}
