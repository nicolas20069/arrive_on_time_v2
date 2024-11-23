export async function getUsers() {
  const response = await fetch("http://localhost:5000/companies");
  const data = await response.json();

  return data;
}

export async function getUserById({ id }) {
  if (!id) return;
  const response = await fetch(`http://localhost:5000/companies/${id}`);
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
  try {
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
      return(null);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error(error)
    throw new Error(error);
  }

}
