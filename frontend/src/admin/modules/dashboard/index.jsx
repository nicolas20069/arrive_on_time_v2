import { Link } from "react-router-dom";
import { Header } from "../../includes/Header.jsx";
import "./styles/main.css";

export function Dashboard() {
  return (
    <>
      <Header />

      <section className="dashboard">
        <aside className="dashboard-aside">
          <h1>Dashboard</h1>

          <div className="dashboard-aside-links">
            <Link to="/admin/employees">
              <article>
                <img src="/dashboard/users.svg" alt="" />
                <span>Gestionar Usuarios</span>
              </article>
            </Link>

            <Link to="/admin/companies">
              <article>
                <img src="/dashboard/buildings.svg" alt="" />
                <span>Gestionar Empresas</span>
              </article>
            </Link>

            <Link to="/admin/employees">
              <article>
                <img src="/dashboard/users.svg" alt="" />
                <span>Gestionar Usuarios</span>
              </article>
            </Link>

            <Link to="/admin/companies">
              <article>
                <img src="/dashboard/buildings.svg" alt="" />
                <span>Gestionar Empresas</span>
              </article>
            </Link>

            <Link to="/admin/employees">
              <article>
                <img src="/dashboard/users.svg" alt="" />
                <span>Gestionar Usuarios</span>
              </article>
            </Link>

            <Link to="/admin/companies">
              <article>
                <img src="/dashboard/buildings.svg" alt="" />
                <span>Gestionar Empresas</span>
              </article>
            </Link>
          </div>
        </aside>

        <main className="dashboard-main">
          <h1>Dashboard</h1>
        </main>
      </section>
    </>
  );
}
