import "./styles/header.css";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  const items = [
    { label: "Empleados", path: "/admin/employees" },
    /* { label: "Reportes", path: "/admin/reports" },
    { label: "Asistencias", path: "/admin/attendances" }, */
    { label: "Empresas", path: "/admin/companies" },
    { label: "Roles", path: "/admin/roles" },
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

        <nav className="nav">
          <ul className="nav-list">
            {items.map((item, index) => (
              <li key={index} className={location.pathname === item.path ? "active" : ""}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
