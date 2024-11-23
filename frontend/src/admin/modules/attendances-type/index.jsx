import { useEffect, useState } from "react";
import { Header } from "../../includes/Header.jsx";
import { TableAttendencesType } from "./components/TableAttendencesType.jsx";

import { getAttendancesType } from "./api/attendances-type.js";
import "./styles/employees.css";

export function AttendancesType() {
  const [attendancesType, setAttendancesType] = useState([])

  useEffect(() => {
    getAttendancesType().then((data) => {
      setAttendancesType(data)
    })
  },[])

  return (
    <>
      <Header />
      { attendancesType && <TableAttendencesType attendancesType={attendancesType}/>}
    </>
  );
}
