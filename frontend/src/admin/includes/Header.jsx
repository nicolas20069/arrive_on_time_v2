import "./styles/header.css";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";

import { getUserById } from "./api/getUser.js"

export function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  const [visibleRight, setVisibleRight] = useState(false);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserById({userId: user.user_id}).then((data) => {
      setUserData(data[0]);
    });
  }, []);
  
  const items = [
    { label: "Usuarios", path: "/admin/users" },
    { label: "Roles", path: "/admin/roles" },
    { label: "Asistencias", path: "/admin/attendances" },
    { label: "Tus Asistencias", path: "/admin/your-attendances" },
    { label: "Empresas o Instituciones", path: "/admin/companies" },
    /* { label: "Reportes", path: "/admin/reports" }, */
    { label: "Tipos de Asistencias", path: "/admin/attendances-type" },
  ];

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/admin">
            <img src="/logo.svg" alt="" />
            <h1>Arrive On Time</h1>
          </Link>
        </div>

        <div className="aside-header">
          <nav className="nav">
            <ul className="nav-list">
              {items.map((item, index) => (
                <li
                  key={index}
                  className={location.pathname === item.path ? "active" : ""}
                >
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <Tooltip target=".user" position="bottom" />
          <Button
            onClick={() => setVisibleRight(true)}
            className="user"
            data-pr-tooltip="Ver Perfil"
          >
            <img className="user-img" src="/user.svg" />
          </Button>
        </div>
      </header>

      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <h2
          style={{ marginBlock: "2px" }}
        >{`${userData.nombres} ${userData.apellidos}`}</h2>
        <p style={{ marginBlock: "1px" }}>{userData.cedula}</p>
        <h2 style={{ marginBlock: "2px" }}>{userData.nombre_empresa}</h2>
        <p style={{ marginBlock: "1px" }}>{userData.rol_name}</p>

        <div style={{ marginTop: "40px" }}>
          {/* <Link to="/user/edit">
            <Button style={{width: "100%"}} className="primary-button" label="Editar Perfil" icon="pi pi-user-edit" />
          </Link> */}

          <Button
            style={{ width: "100%" }}
            className="danger-button"
            label="Cerrar Sesión"
            icon="pi pi-sign-out"
            onClick={() => {
              localStorage.removeItem("user");
              window.location.href = "/";
            }}
          />
        </div>
      </Sidebar>
    </>
  );
}
