import { useEffect, useState } from "react";
import { Header } from "../../includes/Header.jsx";
import { TableCompanies } from "./components/TableCompanies.jsx";

import { getCompanies } from "./api/companies.js";
import "./styles/employees.css";

export function Companies() {
  const [companies, setCompanies] = useState([])

  useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data)
    })
  },[])

  return (
    <>
      <Header />
      { companies && <TableCompanies companies={companies}/>}
    </>
  );
}
