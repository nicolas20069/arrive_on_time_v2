import "./styles/main.css";
import { Header } from "../../includes/Header.jsx";
import { AsideNavButton } from "./components/AsideNavButton.jsx";
import { Footer } from "./components/Footer.jsx";

import { getAsideNavItems } from "./data/navItems.js";

export function Dashboard() {
  const asideNavItems = getAsideNavItems();

  return (
    <>
      <Header />

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

          <Footer />
        </main>
      </section>
    </>
  );
}
