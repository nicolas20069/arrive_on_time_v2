import { BrowserRouter, Routes, Route } from "react-router-dom"
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

import { Employees } from "./admin/modules/employees/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Iniciar Sesion</div>} />
        <Route path="/admin" element={<Employees/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
