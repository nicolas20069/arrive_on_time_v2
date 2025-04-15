export async function getUserById({ userId }) {
  const token = document.cookie.split("=")[1];
  const response = await fetch(`https://localhost:5000/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}
