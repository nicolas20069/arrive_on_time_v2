import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { useState, useRef } from "react";

import { createUser } from "../api/users.js";

export function AddUser({ visible, setVisible }) {
  const toast = useRef(null);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [edad, setEdad] = useState();
  const [cedula, setCedula] = useState();
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState();
  const [contraseña, setContraseña] = useState("");
  const [selectCompany, setSelectCompany] = useState(null);
  const [selectRol, setSelectRol] = useState(null);

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

  const companys = [{ id: 3, name: "Arrive on Time" }];
  const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Empleado" },
  ];

  const handleCreateUser = async () => {
    if (
      !nombres ||
      !apellidos ||
      !correo ||
      !edad ||
      !cedula ||
      !telefono ||
      !contraseña ||
      !selectCompany ||
      !selectRol
    ) {
      showWarn({ detail: "Porfavor llena todos los campos" });
      return;
    }

    const parsedEdad = Number(edad);
    const parsedCedula = Number(cedula);
    const parsedTelefono = Number(telefono);
    const empresaId = Number(selectCompany.id);
    const rolId = Number(selectRol.id);

    try {
      const user = await createUser({
        nombres,
        apellidos,
        correo,
        edad: parsedEdad,
        cedula: parsedCedula,
        direccion,
        telefono: parsedTelefono,
        contraseña,
        empresaId,
        rolId,
        adminId: 1,
      });

      if (user) {
        alert({ detail: "Usuario creado correctamente" });
        setVisible(false);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      showError({
        detail: "Error al crear usuario, porfavor revisa la informacion",
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
        label="Agregar Usuario"
        icon="pi pi-check"
        type="submit"
        form="add-user-form"
        onClick={() => {
          handleCreateUser();
        }}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
      <Toast ref={toast} />
      <Dialog
        header="Agregar Nuevo Usuario"
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
          <label className="label-form" htmlFor="nombres">
            Nombres
            <InputText
              id="nombres"
              type="text"
              placeholder="Nombres"
              required
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
            />
          </label>

          <label className="label-form" htmlFor="apellidos">
            Apellidos
            <InputText
              id="apellidos"
              type="text"
              placeholder="Apellidos"
              required
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
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
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
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
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
            />
          </label>

          <label className="label-form" htmlFor="direccion">
            Direccion
            <InputText
              id="direccion"
              type="text"
              placeholder="Direccion"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </label>

          <label className="label-form" htmlFor="telefono">
            Telefono
            <InputText
              id="telefono"
              type="text"
              keyfilter="pnum"
              placeholder="Telefono"
              required
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </label>

          <label className="label-form" htmlFor="contraseña">
            Contraseña
            <InputText
              id="contraseña"
              type="password"
              placeholder="Contraseña"
              required
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
          </label>

          <Dropdown
            id="empresa"
            value={selectCompany}
            onChange={(e) => setSelectCompany(e.value)}
            options={companys}
            optionLabel="name"
            placeholder="Seleccione una empresa"
            required
          />

          <Dropdown
            id="rol"
            value={selectRol}
            onChange={(e) => setSelectRol(e.value)}
            options={roles}
            optionLabel="name"
            placeholder="Seleccione un rol"
            required
          />
        </form>
      </Dialog>
    </div>
  );
}
