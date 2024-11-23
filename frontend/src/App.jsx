import { BrowserRouter, Routes, Route } from "react-router-dom"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

import { Employees } from "./admin/modules/employees/index.jsx";
import { Dashboard } from "./admin/modules/dashboard/index.jsx";
import { Reports } from "./admin/modules/reports/index.jsx";
import { Attendance } from "./admin/modules/attendances/index.jsx";
import { Companies } from "./admin/modules/companies/index.jsx";
import { Roles } from "./admin/modules/roles/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Iniciar Sesion</div>} />
        <Route path="/admin" element={<Dashboard/>} />
        <Route path="/admin/employees" element={<Employees/>} />
        <Route path="/admin/reports" element={<Reports/>} />
        <Route path="/admin/attendances" element={<Attendance/>} />
        <Route path="/admin/companies" element={<Companies/>} />
        <Route path="/admin/roles" element={<Roles/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
