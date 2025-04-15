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
