export async function getAttendancesType() {
    const response = await fetch("http://localhost:5000/attendances-type");
    const data = await response.json();
  
    return data;
  }
  