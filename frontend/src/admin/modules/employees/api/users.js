const token = document.cookie.split("=")[1];

export async function getUsers() {
  const response = await fetch("https://localhost:5000/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getUserById({ userId }) {
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

export async function createUser({
  nombres,
  apellidos,
  correo,
  fechaNacimiento,
  cedula,
  direccion,
  telefono,
  contraseña,
  empresaId,
  rolId,
}) {
  try {
    const response = await fetch("https://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        correo,
        fechaNacimiento,
        cedula,
        direccion,
        telefono,
        contraseña,
        empresaId,
        rolId,
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
