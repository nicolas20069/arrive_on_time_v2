import { useState, useRef, useEffect } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";

export function UpdateUser({ visible, setVisible, user }) {
  const toast = useRef(null);
  const [userId, setUserId] = useState({
    userId: user.user_id,
  });
  const [userData, setUserData] = useState({
    nombres: "",
    apellidos: "",
    edad: Number(),
    cedula: null,
    correo: "",
    direccion: "",
    telefono: null,
    empresaId: null,
    rolId: null,
    adminId: null,
  });

  const companys = [{ id: 3, name: "Arrive on Time" }];
  const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Empleado" },
  ];

  useEffect(() => {
    console.log(typeof user.edad, typeof userData.edad);
    if (user) {
      setUserData({
        nombres: user.nombres,
        apellidos: user.apellidos,
        edad: Number(user.edad),
        cedula: user.cedula,
        correo: user.correo,
        direccion: user.direccion,
        telefono: Number(user.telefono),
        empresaId: user.empresa_id,
        rolId: user.rol_id,
        adminId: 1,
      });

      setUserId(user.user_id);
    }
  }, [user]);

  const handleChange = (e, field) => {
    const value = e.target ? e.target.value : e.value;
  
    setUserData((prevData) => ({
      ...prevData,
      [field]: field === "edad" || field === "telefono" || field === "cedula" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    console.log(typeof userData.edad);
    try {
      console.log(userData);
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.text();
      toast.current.show({
        severity: "success",
        summary: "Felicidades",
        detail: "Usuario actualizado con éxito",
        life: 3000,
      });

      setVisible(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al actualizar los datos del usuario",
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
        header={`Actualizar datos de: ${user.nombres} ${user.apellidos}`}
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
          <label className="label-form" htmlFor="nombres">
            Nombres
            <InputText
              id="nombres"
              type="text"
              placeholder="Nombres"
              required
              value={userData.nombres}
              onChange={(e) => handleChange(e, "nombres")}
            />
          </label>

          <label className="label-form" htmlFor="apellidos">
            Apellidos
            <InputText
              id="apellidos"
              type="text"
              placeholder="Apellidos"
              required
              value={userData.apellidos}
              onChange={(e) => handleChange(e, "apellidos")}
            />
          </label>

          <label className="label-form" htmlFor="correo">
            Correo electronico
            <InputText
              id="correo"
              type="email"
              keyfilter="email"
              placeholder="Correo electronico"
              required
              value={userData.correo}
              onChange={(e) => handleChange(e, "correo")}
            />
          </label>

          <label className="label-form" htmlFor="edad">
            Edad
            <InputText
              id="edad"
              type="number"
              keyfilter="pnum"
              placeholder="Edad"
              required
              value={userData.edad}
              onChange={(e) => handleChange(e, "edad")}
            />
          </label>

          <label className="label-form" htmlFor="cedula">
            Cedula
            <InputText
              id="cedula"
              type="number"
              keyfilter="pnum"
              placeholder="Cedula"
              required
              value={userData.cedula}
              onChange={(e) => handleChange(e, "cedula")}
            />
          </label>

          <label className="label-form" htmlFor="direccion">
            Direccion
            <InputText
              id="direccion"
              type="text"
              placeholder="Direccion"
              value={userData.direccion}
              onChange={(e) => handleChange(e, "direccion")}
            />
          </label>

          <label className="label-form" htmlFor="telefono">
            Telefono
            <InputText
              id="telefono"
              type="number"
              keyfilter="pnum"
              placeholder="Telefono"
              required
              value={userData.telefono}
              onChange={(e) => handleChange(e, "telefono")}
            />
          </label>

          <Dropdown
            id="empresa"
            value={userData.empresaId === 3 ? companys[0] : userData.empresaId}
            onChange={(e) => handleChange(e, "empresaId")}
            options={companys}
            optionLabel="name"
            placeholder="Seleccione una empresa"
            required
          />

          <Dropdown
            id="rol"
            value={
              userData.rolId === 1
                ? roles[0]
                : userData.rolId === 2
                ? roles[1]
                : userData.rolId
            }
            onChange={(e) => handleChange(e, "rolId")}
            options={roles}
            optionLabel="name"
            placeholder="Seleccione un rol"
            required
          />
        </form>
      </Dialog>
    </>
  );
}
