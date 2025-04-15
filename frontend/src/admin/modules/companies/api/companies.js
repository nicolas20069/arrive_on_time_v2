const token = document.cookie.split("=")[1];

export async function getCompanies() {
  const response = await fetch("https://localhost:5000/companies", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getCompanyById({ id }) {
  const response = await fetch(`https://localhost:5000/companies/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}

export async function createCompany({ companyName, userAdminId }) {
  try {
    const response = await fetch("https://localhost:5000/companies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        companyName,
        userAdminId,
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}
