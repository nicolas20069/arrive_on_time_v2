import z from "zod";

const attendanceTypeSchema = z.object({
  attendanceTypeName: z.string(),
  adminId: z.number().int(),
});

export function validateAttendanceType(input) {
  return attendanceTypeSchema.safeParse(input);
}
