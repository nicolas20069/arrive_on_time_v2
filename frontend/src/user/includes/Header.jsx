import "./styles/header.css";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from "primereact/tooltip";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useState } from "react";

export function Header({ user }) {
  const location = useLocation();
  const [visibleRight, setVisibleRight] = useState(false);

  const items = [{ label: "Tus Asistencias", path: "/user" }];

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/user">
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
        >{`${user.nombres} ${user.apellidos}`}</h2>
        <p style={{ marginBlock: "1px" }}>{user.cedula}</p>
        <h2 style={{ marginBlock: "2px" }}>{user.nombre_empresa}</h2>
        <p style={{ marginBlock: "1px" }}>{user.rol_name}</p>

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
