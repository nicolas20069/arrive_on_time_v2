export async function getUsersAdmins() {
    const response = await fetch("http://localhost:5000/users/admins");
    const data = await response.json();
  
    return data;
  }