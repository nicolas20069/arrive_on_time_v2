import { useEffect, useState } from "react";
import { Header } from "../../includes/Header.jsx";
import { TableAttendances } from "./components/TableAttendances.jsx";

import { getYourAttendances } from "./api/your-attendances.js";
import { getUserById } from "./api/user.js";
import "./styles/attendances.css";

export function YourAttendances() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return
  }

  const [attendances, setAttendances] = useState([]);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    getYourAttendances({userId: user.user_id}).then((data) => {
      setAttendances(data);
    });

    getUserById({userId: user.user_id}).then((data) => {
      setUserData(data[0]);
    });
  }, []);

  return (
    <>
      <Header user={userData} />
      {attendances && <TableAttendances attendances={attendances} user={user} />}
    </>
  );
}
