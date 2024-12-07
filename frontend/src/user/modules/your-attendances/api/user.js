export async function getUserById({ userId }) {
    const response = await fetch(`http://localhost:5000/users/${userId}`);
    const data = await response.json();
  
    return data;
  }
  