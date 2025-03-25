import { useEffect, useState } from "react";
import { Header } from "../../includes/Header.jsx";
import { AsideNavButton } from "./components/AsideNavButton.jsx";
import "./styles/main.css";

import { getUserById } from "./api/user.js";
import { getAsideNavItems } from "./data/navItems.js";

export function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getUserById({ userId: user.user_id }).then((data) => {
      setUserData(data[0]);
    });
  }, []);

  const asideNavItems = getAsideNavItems(userData);

  return (
    <>
      <Header/>

      <section className="dashboard">
        <main className="dashboard-main">
          <h1>
            ¡Bienvenido de nuevo a <span>Arrive On Time</span>!
          </h1>
          <h2>¿Que deseas hacer hoy?</h2>

          <div className="dashboard-links">
            {asideNavItems.map((item, index) => {
              return (
                <AsideNavButton
                  key={index}
                  to={item.to}
                  icon={item.icon}
                  title={item.title}
                />
              );
            })}
          </div>

          <footer className="dashboard-footer">
            <div>
              <span>©Arrive On Time 2025 </span>
              <span>- Todos los derechos reservados</span>
            </div>

            <div>
              <small>Desarrollado por: </small>
              <small>Juan Cuellar y Nicolas Melo</small>
            </div>
          </footer>
        </main>
      </section>
    </>
  );
}
