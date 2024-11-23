import { useEffect, useState } from "react";
import { Header } from "../../includes/Header.jsx";
import { TableRoles } from "./components/TableRoles.jsx";

import { getRoles } from "./api/roles.js";
import "./styles/employees.css";

export function Roles() {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    getRoles().then((data) => {
      setRoles(data)
    })
  },[])

  return (
    <>
      <Header />
      { roles && <TableRoles roles={roles}/>}
    </>
  );
}
