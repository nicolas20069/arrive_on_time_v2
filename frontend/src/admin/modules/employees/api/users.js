export async function getUsers() {
  const response = await fetch("http://localhost:5000/users");
  const data = await response.json();

  return data;
}

export async function getUserById({ id }) {
  if (!id) return;
  const response = await fetch(`http://localhost:5000/users/${id}`);
  const data = await response.json();

  return data;
}

export async function createUser({
  nombres,
  apellidos,
  correo,
  edad,
  cedula,
  direccion,
  telefono,
  contraseña,
  empresaId,
  rolId,
  adminId,
}) {
  const response = await fetch("http://localhost:5000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombres,
      apellidos,
      correo,
      edad,
      cedula,
      direccion,
      telefono,
      contraseña,
      empresaId,
      rolId,
      adminId,
    }),
  });
  if (!response.ok) {
    throw new Error("Error al crear usuario");
  }

  const data = await response.json();
  return data;
}
