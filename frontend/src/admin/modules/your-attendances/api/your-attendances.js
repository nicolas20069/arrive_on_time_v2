export async function getYourAttendances({ userId }) {
    const response = await fetch(`http://localhost:5000/attendances/user/${userId}`, );
    const data = await response.json();
  
    return data;
  }
  