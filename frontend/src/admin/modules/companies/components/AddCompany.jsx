import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useState, useRef, useEffect } from "react";

import { createCompany } from "../api/companies.js";
import { getUsersAdmins } from "../api/usersAdmins.js";
import { Dropdown } from "primereact/dropdown";

export function AddCompany({ visible, setVisible }) {
  const toast = useRef(null);

  const [usersAdmins, setUsersAdmins] = useState([]);

  const [companyName, setCompanyName] = useState("");
  const [userAdminId, setUserAdminId] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const usersAdminsData = await getUsersAdmins();

      setUsersAdmins(usersAdminsData);
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

  const handleCreateCompany = async (e) => {
    if (!companyName || !userAdminId.user_id) {
      showWarn({ detail: "Porfavor llena todos los campos" });
      return;
    }

    const parsedUserAdmindId = Number(userAdminId.user_id);

    try {
      const company = await createCompany({
        companyName,
        userAdminId: parsedUserAdmindId,
        adminId: 1,
      });

      if (company) {
        showSuccess({ detail: "Empresa creada correctamente" });
        setVisible(false);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        showError({ detail: "Error al crear la empresa" });
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
        label="Agregar Empresa"
        icon="pi pi-check"
        className="primary-button"
        onClick={() => {
          handleCreateCompany();
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
          <label className="label-form" htmlFor="nombre-empresa">
            Nombre de la Empresa
            <InputText
              id="nombre-empresa"
              type="text"
              placeholder="Nombre de la Empresa"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </label>

          <label className="label-form" htmlFor="admin-empresa">
            Administrador de la Empresa
            <Dropdown
              id="admin-empresa"
              value={userAdminId}
              onChange={(e) => setUserAdminId(e.value)}
              options={usersAdmins}
              optionLabel={(option) => `${option.nombres} ${option.apellidos}`}
              placeholder="Seleccione el administrador de la empresa"
              required
            />
          </label>
        </form>
      </Dialog>
    </div>
  );
}
