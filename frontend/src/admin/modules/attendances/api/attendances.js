const token = document.cookie.split("=")[1];

export async function getAttendances() {
  const response = await fetch("https://localhost:5000/attendances", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}

export async function gerAttendanceById({ id }) {
  const response = await fetch(`https://localhost:5000/attendances/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

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
    const response = await fetch("https://localhost:5000/attendances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        date,
        time,
        attendanceTypeId,
        userId,
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
