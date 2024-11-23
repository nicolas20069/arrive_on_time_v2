export async function getCompanies() {
  const response = await fetch("http://localhost:5000/companies");
  const data = await response.json();

  return data;
}

export async function getCompanyById({ id }) {
  if (!id) return;
  const response = await fetch(`http://localhost:5000/companies/${id}`);
  const data = await response.json();

  return data;
}

export async function createCompany({
  companyName,
  userAdminId,
  adminId,
}) {
  try {
    const response = await fetch("http://localhost:5000/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        userAdminId,
        adminId,
      }),
    });
    
    if (!response.ok) {
      return(null);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error)
    throw new Error(error);
  }

}
