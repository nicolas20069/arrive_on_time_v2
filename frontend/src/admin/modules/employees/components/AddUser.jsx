import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

import { createUser } from "../api/users.js";

export function AddUser({ visible, setVisible }) {
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

  const companys = [{ id: 3, name: "Arrive on Time" }];
  const roles = [
    { id: 1, name: "Administrador" },
    { id: 2, name: "Empleado" },
  ];

  const handleCreateUser = async () => {
    const parsedEdad = Number(edad);
    const parsedCedula = Number(cedula);
    const parsedTelefono = Number(telefono);
    const empresaId = Number(selectCompany.id);
    const rolId = Number(selectRol.id);

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

    console.log(user);
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
        onClick={() => {
          handleCreateUser();
          setVisible(false);
        }}
        autoFocus
      />
    </div>
  );

  return (
    <div className="card flex justify-content-center">
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
        <form className="add-user-form">
          <label className="label-form" htmlFor="nombres">
            Nombres
            <InputText
              id="nombres"
              type="text"
              placeholder="Nombres"
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
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
            />
          </label>

          <label className="label-form" htmlFor="correo">
            Correo electronico
            <InputText
              id="correo"
              type="email"
              placeholder="Correo electronico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </label>

          <label className="label-form" htmlFor="edad">
            Edad
            <InputText
              id="edad"
              type="number"
              placeholder="Edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
            />
          </label>

          <label className="label-form" htmlFor="cedula">
            Cedula
            <InputText
              id="cedula"
              type="number"
              placeholder="Cedula"
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
              placeholder="Telefono"
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
          />

          <Dropdown
            id="rol"
            value={selectRol}
            onChange={(e) => setSelectRol(e.value)}
            options={roles}
            optionLabel="name"
            placeholder="Seleccione un rol"
          />
        </form>
      </Dialog>
    </div>
  );
}
