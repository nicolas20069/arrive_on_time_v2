import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import "primeicons/primeicons.css";

import { Login } from "./login/index.jsx";
import { Employees } from "./admin/modules/employees/index.jsx";
import { Dashboard } from "./admin/modules/dashboard/index.jsx";
// import { Reports } from "./admin/modules/reports/index.jsx";
import { Attendance } from "./admin/modules/attendances/index.jsx";
import { Companies } from "./admin/modules/companies/index.jsx";
import { Roles } from "./admin/modules/roles/index.jsx";
import { AttendancesType } from "./admin/modules/attendances-type/index.jsx";
import { YourAttendances } from "./user/modules/your-attendances/index.jsx";
import { YourAttendancesAdmin } from "./admin/modules/your-attendances/index.jsx";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!user) {
      return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.rol_id)) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={[1]}>
              <Routes>
                <Route path="" element={<Dashboard />} />
                <Route path="users" element={<Employees />} />
                {/* <Route path="reports" element={<Reports />} /> */}
                <Route path="attendances" element={<Attendance />} />
                <Route path="your-attendances" element={<YourAttendancesAdmin />} />
                <Route path="companies" element={<Companies />} />
                <Route path="roles" element={<Roles />} />
                <Route path="attendances-type" element={<AttendancesType />} />
              </Routes>
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/*"
          element={
            <ProtectedRoute
              allowedRoles={[
                2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
                20,
              ]}
            >
              <Routes>
                <Route path="" element={<YourAttendances/>} />
                <Route path="profile" element={<YourAttendances/>} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
