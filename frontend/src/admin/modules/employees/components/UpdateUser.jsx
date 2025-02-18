import { useState, useRef, useEffect } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Toast } from "primereact/toast";
import { addLocale } from "primereact/api";

import { getCompanies } from "../api/companies";
import { getRoles } from "../api/roles";
import { Calendar } from "primereact/calendar";

export function UpdateUser({ visible, setVisible, user }) {
  const toast = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);

  const [userId, setUserId] = useState({userId: user.user_id});
  const [userData, setUserData] = useState({
    nombres: "",
    apellidos: "",
    fechaNacimiento: new Date(),
    cedula: null,
    correo: "",
    direccion: "",
    telefono: null,
    empresaId: null,
    rolId: null,
    adminId: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companiesData = await getCompanies();
        const rolesData = await getRoles();

        setCompanies(
          companiesData.map((company) => ({
            label: company.nombre_empresa,
            value: company.empresa_id,
          }))
        );

        setRoles(
          rolesData.map((role) => ({
            label: role.rol_name,
            value: role.rol_id,
          }))
        );
      } catch (error) {
        console.error("Error fetching companies or roles:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (user) {
      setUserData({
        nombres: user.nombres,
        apellidos: user.apellidos,
        fechaNacimiento: new Date(user.fecha_nacimiento),
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
      [field]: field === "telefono" || field === "cedula" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    const newUserData = {
      ...userData,
      fechaNacimiento: userData.fechaNacimiento.toISOString().split("T")[0],
    }
    console.log(newUserData);
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUserData),
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
            {/* Edad
            <InputText
              id="edad"
              type="number"
              keyfilter="pnum"
              placeholder="Edad"
              required
              value={userData.edad}
              onChange={(e) => handleChange(e, "edad")}
            /> */}
            Fecha de Nacimiento
            <Calendar
              id="fecha-nacimiento"
              placeholder="Fecha de Nacimiento"
              dateFormat="yy-mm-dd"
              required
              value={userData.fechaNacimiento}
              onChange={(e) => handleChange(e, "fechaNacimiento")}
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
            value={userData.empresaId}
            onChange={(e) => handleChange(e, "empresaId")}
            options={companies}
            /* optionLabel="nombre_empresa" */
            placeholder="Seleccione una empresa"
            required
          />

          <Dropdown
            id="rol"
            value={userData.rolId}
            onChange={(e) => handleChange(e, "rolId")}
            options={roles}
            /* optionLabel="rol_name" */
            placeholder="Seleccione un rol"
            required
          />
        </form>
      </Dialog>
    </>
  );
}
