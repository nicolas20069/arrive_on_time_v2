import { useEffect, useState } from "react";
import { Header } from "../../includes/Header.jsx";
import { TableUsers } from "./components/TableUsers.jsx";

import { getUsers } from "./api/users.js";
import './styles/employees.css'

export function Employees() {
  const [users, setUsers] = useState([])
  const [change, setChange] = useState(false)

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data)
    })
  },[change])

  return (
    <>
      <Header />
      { users && <TableUsers users={users} setChange={setChange} />}
    </>
  );
}
