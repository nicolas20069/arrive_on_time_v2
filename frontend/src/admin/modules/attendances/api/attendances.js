export async function getAttendances() {
  const response = await fetch("http://localhost:5000/attendances");
  const data = await response.json();

  return data;
}

export async function gerAttendanceById({ id }) {
  if (!id) return;
  const response = await fetch(`http://localhost:5000/attendances/${id}`);
  const data = await response.json();

  return data;
}

export async function createAttendance({
  date,
  time,
  attendanceTypeId,
  userId,
}) {
  try {
    const response = await fetch("http://localhost:5000/attendances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        time,
        attendanceTypeId,
        userId,
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
