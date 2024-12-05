import { Header } from "../../includes/Header.jsx";
import "./styles/main.css";
import { AsideNavButton } from "./components/AsideNavButton.jsx";

export function Dashboard() {

  const asideNavItems = [
    {
      to: "/admin/employees",
      icon: "users",
      title: "Gestionar Usuarios",
    },

    {
      to: "/admin/companies",
      icon: "buildings",
      title: "Gestionar Empresas",
    },

    {
      to: "/admin/roles",
      icon: "user-tag",
      title: "Gestionar Roles",
    },

    {
      to: "/admin/attendances",
      icon: "calendar-alt",
      title: "Gestionar Asistencias",
    },

    {
      to: "/admin/attendances-type",
      icon: "calendar-check",
      title: "Gestionar Tipos de Asistencias",
    },

    {
      to: "/admin/reports",
      icon: "chart-line",
      title: "Gestionar Reportes",
    }
  ]
  return (
    <>
      <Header />

      <section className="dashboard">
        <aside className="dashboard-aside">
          <h1>Dashboard</h1>

          <div className="dashboard-aside-links">
            {
              asideNavItems.map((item, index) => {
                return (
                  <AsideNavButton
                    key={index}
                    to={item.to}
                    icon={item.icon}
                    title={item.title}
                  />
                );
              })
            }
          </div>
        </aside>

        <main className="dashboard-main">
          <h1>Dashboard</h1>
        </main>
      </section>
    </>
  );
}
