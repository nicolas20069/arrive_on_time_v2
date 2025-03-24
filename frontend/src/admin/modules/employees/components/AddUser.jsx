import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { addLocale } from "primereact/api";
import { useState, useRef, useEffect } from "react";

import { createUser } from "../api/users.js";
import { getCompanies } from "../api/companies.js";
import { getRoles } from "../api/roles.js";
import { Calendar } from "primereact/calendar";

export function AddUser({ visible, setVisible }) {
  const toast = useRef(null);

  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [cedula, setCedula] = useState();
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState();
  const [contraseña, setContraseña] = useState("");
  const [selectCompany, setSelectCompany] = useState(null);
  const [selectRol, setSelectRol] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const companies = await getCompanies();
      const roles = await getRoles();

      setCompanies(companies);
      setRoles(roles);
    };

    fetchData();
  }, []);

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

  addLocale("es", {
    firstDayOfWeek: 1,
    showMonthAfterYear: true,
    dayNames: [
      "domingo",
      "lunes",
      "martes",
      "miércoles",
      "jueves",
      "viernes",
      "sábado",
    ],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: [
      "enero",
      "febrero",
      "marzo",
      "abril",
      "mayo",
      "junio",
      "julio",
      "agosto",
      "septiembre",
      "octubre",
      "noviembre",
      "diciembre",
    ],
    monthNamesShort: [
      "ene",
      "feb",
      "mar",
      "abr",
      "may",
      "jun",
      "jul",
      "ago",
      "sep",
      "oct",
      "nov",
      "dic",
    ],
    today: "Hoy",
    clear: "Limpiar",
  });

  const handleCreateUser = async (e) => {
    if (
      !nombres ||
      !apellidos ||
      !correo ||
      !fechaNacimiento ||
      !cedula ||
      !telefono ||
      !contraseña ||
      !selectCompany ||
      !selectRol
    ) {
      showWarn({ detail: "Porfavor llena todos los campos" });
      return;
    }

    const parsedFechaNacimiento = fechaNacimiento.toISOString().split("T")[0];
    const parsedCedula = Number(cedula);
    const parsedTelefono = Number(telefono);
    const empresaId = Number(selectCompany.empresa_id);
    const rolId = Number(selectRol.rol_id);

    try {
      const user = await createUser({
        nombres,
        apellidos,
        correo,
        fechaNacimiento: parsedFechaNacimiento,
        cedula: parsedCedula,
        direccion,
        telefono: parsedTelefono,
        contraseña,
        empresaId,
        rolId,
        adminId: 2,
      });

      if (user) {
        showSuccess({ detail: "Usuario creado correctamente" });
        setVisible(false);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        showError({ detail: "Error al crear el usuario" });
      }
    } catch (error) {
      showError({
        detail: error.message,
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
        className="primary-button"
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

          <label className="label-form" htmlFor="fecha-nacimiento">
            Fecha de Nacimiento
            <Calendar
              id="fecha-nacimiento"
              placeholder="Fecha de Nacimiento"
              dateFormat="yy-mm-dd"
              required
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              locale="es"
              showIcon
              showButtonBar
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
              type="number"
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
            options={companies}
            optionLabel="nombre_empresa"
            placeholder="Seleccione una empresa"
            required
          />

          <Dropdown
            id="rol"
            value={selectRol}
            onChange={(e) => setSelectRol(e.value)}
            options={roles}
            optionLabel="rol_name"
            placeholder="Seleccione un rol"
            required
          />
        </form>
      </Dialog>
    </div>
  );
}
