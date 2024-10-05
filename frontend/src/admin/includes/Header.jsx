import { TabMenu } from "primereact/tabmenu";
import "./styles/header.css";

export function Header() {
  const items = [
    { label: "Empleados", icon: "pi pi-users" },
    { label: "Reportes", icon: "pi pi-chart-line" },
  ]

  return (
    <>
      <header className="header">
        <div className="logo">
          <img src="/favicon.svg" alt="" />
          <h1>Arrive On Time</h1>
        </div>

        <div className="card">
          <TabMenu model={items} />
        </div>
      </header>
    </>
  );
}
