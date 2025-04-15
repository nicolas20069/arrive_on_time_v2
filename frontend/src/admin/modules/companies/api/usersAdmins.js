const token = document.cookie.split("=")[1];

export async function getUsersAdmins() {
  const response = await fetch("https://localhost:5000/users/admins", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });
  
  const data = await response.json();
  return data;
}
