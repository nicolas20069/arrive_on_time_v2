import { Header } from "../../includes/Header.jsx";
import "./styles/main.css";

export function Dashboard() {
  return (
    <>
      <Header />

      <section className="dashboard">
        <aside className="dashboard-aside">
          <h1>Dashboard</h1>
        </aside>

        <main className="dashboard-main">
          <article>
            <img src="/dashboard/users.svg" alt="" />
            <div>
              <h2>Gestionar usuarios</h2>
              <span>Haz click aqui</span>
            </div>
          </article>

          <article>
            <img src="/dashboard/users.svg" alt="" />
            <div>
              <h2>Gestionar usuarios</h2>
              <span>Haz click aqui</span>
            </div>
          </article>

          <article>
            <img src="/dashboard/users.svg" alt="" />
            <div>
              <h2>Gestionar usuarios</h2>
              <span>Haz click aqui</span>
            </div>
          </article>

          <article>
            <img src="/dashboard/users.svg" alt="" />
            <div>
              <h2>Gestionar usuarios</h2>
              <span>Haz click aqui</span>
            </div>
          </article>
        </main>
      </section>
    </>
  );
}
