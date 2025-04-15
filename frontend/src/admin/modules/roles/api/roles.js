const token = document.cookie.split("=")[1];

export async function getRoles() {
  const response = await fetch("https://localhost:5000/roles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getRolById({ id }) {
  const response = await fetch(`https://localhost:5000/roles/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}

export async function createRol({ rolName }) {
  try {
    const response = await fetch("https://localhost:5000/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        rolName,
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
