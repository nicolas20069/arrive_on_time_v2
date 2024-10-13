import z from "zod";

const attendanceSchema = z.object({
  date: z.string(),
  time: z.string(),
  attendanceTypeId: z.number().int(),
  userId: z.number().int(),
});

export function validateAttendance(input) {
  return attendanceSchema.safeParse(input);
}
