import { useState, useRef, useEffect } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

export function UpdateRol({ visible, setVisible, rol }) {
  const toast = useRef(null);
  const [rolId, setRolId] = useState({
    rolId: rol.rol_id,
  });
  const [rolData, setRolData] = useState({
    rolName: "",
    adminId: null,
  });

  useEffect(() => {
    if (rol) {
      setRolData({
        rolName: rol.rol_name,
        adminId: 1,
      });

      setRolId(rol.rol_id);
    }
  }, [rol]);

  const handleChange = (e, field) => {
    const value = e.target ? e.target.value : e.value;
  
    setRolData((prevData) => ({
      ...prevData,
      [field]: field === "adminId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/roles/${rolId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rolData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.text();
      toast.current.show({
        severity: "success",
        summary: "Felicidades",
        detail: "Empresa actualizada correctamente",
        life: 3000,
      });

      setVisible(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error al actualizar los datos del rol:", error);

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al actualizar los datos del rol",
        life: 3000,
      });
    }
  };

  const footerContent = (
    <div>
      <Button
        label="Cancelar"
        icon="pi pi-times"
        severity="secondary"
        className="p-button-text"
        size="small"
        onClick={() => setVisible(false)}
      />
      <Button
        className="primary-button"
        label="Actualizar Datos"
        icon="pi pi-refresh"
        size="small"
        onClick={handleSubmit}
      />
    </div>
  );

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        header={`Actualizar datos del rol: ${rol.rol_name}`}
        visible={visible}
        style={{ width: "50vw" }}
        draggable={false}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
        footer={footerContent}
      >
        <form id="update-user-form" className="update-user-form">
          <label className="label-form" htmlFor="nombre-rol">
            Nombre del Rol
            <InputText
              id="nombre-rol"
              type="text"
              placeholder="Nombre del rol"
              required
              value={rolData.rolName}
              onChange={(e) => handleChange(e, "rolName")}
            />
          </label>
        </form>
      </Dialog>
    </>
  );
}
