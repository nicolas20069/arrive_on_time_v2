const token = document.cookie.split("=")[1];

export async function getAttendancesType() {
  const response = await fetch("https://localhost:5000/attendances-type", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}

export async function getAttendancesTypeById({ id }) {
  const response = await fetch(`https://localhost:5000/attendances-type/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  });

  const data = await response.json();
  return data;
}

export async function createAttendanceType({ attendanceTypeName }) {
  try {
    const response = await fetch("https://localhost:5000/attendances-type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
      body: JSON.stringify({
        attendanceTypeName,
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
