import { Header } from "../../includes/Header.jsx";
import "./styles/main.css";
import { AsideNavButton } from "./components/AsideNavButton.jsx";

export function Dashboard() {
  const asideNavItems = [
    {
      to: "/admin/employees",
      icon: "dashboard/users",
      title: "Gestionar Usuarios",
    },

    {
      to: "/admin/companies",
      icon: "dashboard/buildings",
      title: "Gestionar Empresas o Instituciones",
    },

    {
      to: "/admin/roles",
      icon: "dashboard/user-tag",
      title: "Gestionar Roles",
    },

    {
      to: "/admin/attendances",
      icon: "dashboard/calendar-alt",
      title: "Gestionar Asistencias",
    },

    {
      to: "/admin/attendances-type",
      icon: "dashboard/calendar-check",
      title: "Gestionar Tipos de Asistencias",
    },

    {
      to: "/admin/profile",
      icon: "user",
      title: "Ver Perfil",
    },
  ];
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

          <footer className="dashboard-footer">
            <div>
              <span>©Arrive On Time 2024 </span>
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
