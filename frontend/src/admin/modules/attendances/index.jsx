import { useEffect, useState } from "react";
import { Header } from "../../includes/Header.jsx";
import { TableAttendances } from "./components/TableAttendances.jsx";

import { getAttendances } from "./api/attendances.js";
import "./styles/attendances.css";

export function Attendance() {
  const [attendances, setAttendances] = useState([])

  useEffect(() => {
    getAttendances().then((data) => {
      setAttendances(data)
    })
  },[])

  return (
    <>
      <Header />
      { attendances && <TableAttendances attendances={attendances}/>}
    </>
  );
}
