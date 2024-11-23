export async function getRoles() {
  const response = await fetch("http://localhost:5000/roles");
  const data = await response.json();

  return data;
}

export async function getRolById({ id }) {
  if (!id) return;
  const response = await fetch(`http://localhost:5000/roles/${id}`);
  const data = await response.json();

  return data;
}

export async function createRol({
  rolName,
  adminId,
}) {
  try {
    const response = await fetch("http://localhost:5000/roles", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rolName,
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
