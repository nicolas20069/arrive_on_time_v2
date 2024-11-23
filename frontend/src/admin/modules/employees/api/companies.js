export async function getCompanies() {
    const response = await fetch("http://localhost:5000/companies");
    const data = await response.json();
  
    return data;
  }
  