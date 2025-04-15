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

export async function auth(token) {
  const response = await fetch(`https://localhost:5000/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  if (response.status === 200) {
    return await response.json();
  }else {
    window.location.href = "/";
  }
}
