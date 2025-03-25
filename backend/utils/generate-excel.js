import xlsx from "xlsx-populate";

// funcion para generar el excel con las asistencias
export async function generateExcel(attendances, filePath) {
  const workbook = await xlsx.fromBlankAsync();
  const sheet = workbook.sheet(0);

  sheet.cell("A1").value("ID Asistencia");
  sheet.cell("B1").value("Fecha");
  sheet.cell("C1").value("Hora");
  sheet.cell("D1").value("Nombres");
  sheet.cell("E1").value("Apellidos");
  sheet.cell("F1").value("Cedula");
  sheet.cell("G1").value("Empresa");
  sheet.cell("H1").value("Tipo de Asistencia");

  attendances.forEach((attendance, index) => {
    const row = index + 2;
    sheet.cell(`A${row}`).value(attendance.asistencia_id);
    sheet.cell(`B${row}`).value(attendance.fecha);
    sheet.cell(`C${row}`).value(attendance.hora);
    sheet.cell(`D${row}`).value(attendance.nombres);
    sheet.cell(`E${row}`).value(attendance.apellidos);
    sheet.cell(`F${row}`).value(attendance.cedula);
    sheet.cell(`G${row}`).value(attendance.nombre_empresa);
    sheet.cell(`H${row}`).value(attendance.tipo_asistencia);
  });

  await workbook.toFileAsync(filePath);
}