const token = document.cookie.split("=")[1];

export async function getUsers() {
  const response = await fetch("http://localhost:5000/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}
