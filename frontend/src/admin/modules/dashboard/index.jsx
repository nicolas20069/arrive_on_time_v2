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

                <div>
                  <span>Gestionar Usuarios</span>
                  <small>Haz click aqui</small>
                </div>
              </article>
            </Link>

            <Link to="/admin/companies">
              <article>
                <img src="/dashboard/buildings.svg" alt="" />

                <div>
                  <span>Gestionar Empresas</span>
                  <small>Haz click aqui</small>
                </div>
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
