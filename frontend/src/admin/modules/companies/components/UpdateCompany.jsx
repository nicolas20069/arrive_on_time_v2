import { useState, useRef, useEffect } from "react";

import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

export function UpdateCompany({ visible, setVisible, company }) {
  const toast = useRef(null);
  const [companyId, setCompanyId] = useState({
    companyId: company.empresa_id,
  });
  const [companyData, setcompanyData] = useState({
    companyName: "",
    userAdminId: null,
    adminId: null,
  });

  useEffect(() => {
    if (company) {
      setcompanyData({
        companyName: company.nombre_empresa,
        userAdminId: Number(company.admin_id),
        adminId: 1,
      });

      setCompanyId(company.empresa_id);
    }
  }, [company]);

  const handleChange = (e, field) => {
    const value = e.target ? e.target.value : e.value;
  
    setcompanyData((prevData) => ({
      ...prevData,
      [field]: field === "userAdminId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    console.log(companyId);
    try {
      const response = await fetch(`http://localhost:5000/companies/${companyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
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
      console.error("Error al actualizar los datos de la empresa:", error);

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Error al actualizar los datos de la empresa",
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
        header={`Actualizar datos de la empresa ${company.nombre_empresa}`}
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
          <label className="label-form" htmlFor="nombre-empresa">
            Nombre de la empresa
            <InputText
              id="nombre-empresa"
              type="text"
              placeholder="Nombre de la empresa"
              required
              value={companyData.companyName}
              onChange={(e) => handleChange(e, "companyName")}
            />
          </label>

          <label className="label-form" htmlFor="admin-empresa">
            Administrador de la empresa
            <InputText
              id="admin-empresa"
              type="number"
              keyfilter="pnum"
              placeholder="Administrador de la empresa"
              required
              value={companyData.userAdminId}
              onChange={(e) => handleChange(e, "userAdminId")}
            />
          </label>
        </form>
      </Dialog>
    </>
  );
}
