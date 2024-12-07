import "./styles/header.css";
import { Link, useLocation } from "react-router-dom";
import { Tooltip } from 'primereact/tooltip';

export function Header() {
  const location = useLocation();

  const items = [
    { label: "Tus Asistencias", path: "/user" },
  ];

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
          <Link to="/user/profile" className="user" data-pr-tooltip="Ver Perfil">
            <img className="user-img" src="/user.svg" />
          </Link>
        </div>
      </header>
    </>
  );
}
