import z from "zod";

const attendanceTypeSchema = z.object({
  attendanceTypeName: z.string(),
});

export function validateAttendanceType(input) {
  return attendanceTypeSchema.safeParse(input);
}
