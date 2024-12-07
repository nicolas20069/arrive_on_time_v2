import "./styles/header.css";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';

export function Header() {
  const location = useLocation();

  const items = [
    { label: "Usuarios", path: "/admin/users" },
    { label: "Roles", path: "/admin/roles" },
    { label: "Asistencias", path: "/admin/attendances" },
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
          <Link to="/admin/profile" className="user" data-pr-tooltip="Ver Perfil">
            <img className="user-img" src="/user.svg" />
          </Link>
        </div>
      </header>
    </>
  );
}
