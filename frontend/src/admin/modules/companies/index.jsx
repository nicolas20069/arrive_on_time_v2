import { useEffect, useState } from "react";
import { Header } from "../../includes/Header.jsx";
import { TableUsers } from "./components/TableUsers.jsx";

import { getUsers } from "./api/users.js";
import "./styles/employees.css";

export function Companies() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data)
    })
  },[])

  return (
    <>
      <Header />
      { users && <TableUsers users={users}/>}
    </>
  );
}
