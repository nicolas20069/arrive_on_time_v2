export async function getRoles() {
    const response = await fetch("http://localhost:5000/roles");
    const data = await response.json();
  
    return data;
  }
  