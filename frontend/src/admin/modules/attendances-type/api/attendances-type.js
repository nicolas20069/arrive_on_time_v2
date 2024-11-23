export async function getAttendancesType() {
  const response = await fetch("http://localhost:5000/attendances-type");
  const data = await response.json();

  return data;
}

export async function getAttendancesTypeById({ id }) {
  if (!id) return;
  const response = await fetch(`http://localhost:5000/attendances-type/${id}`);
  const data = await response.json();

  return data;
}

export async function createAttendanceType({
  attendanceTypeName,
  adminId,
}) {
  try {
    const response = await fetch("http://localhost:5000/attendances-type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        attendanceTypeName,
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
