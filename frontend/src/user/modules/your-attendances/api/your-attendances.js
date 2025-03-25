export async function getYourAttendances({ userId }) {
  const token = document.cookie.split("=")[1];
  const response = await fetch(
    `http://localhost:5000/attendances/user/${userId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    }
  );
  
  const data = await response.json();
  return data;
}
