import "./styles/header.css";
import { Link } from "react-router-dom";

export function Header() {
  const items = [
    { label: "Empleados", path: "/admin/employees" },
    /* { label: "Reportes", path: "/admin/reports" },
    { label: "Asistencias", path: "/admin/attendances" }, */
    { label: "Empresas", path: "/admin/companies" },
    { label: "Roles", path: "/admin/roles" },
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
              <li key={index}>
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
