import z from "zod";

const rolSchema = z.object({
  rolName: z.string(),
  adminId: z.number().int(),
});

export function validateRol(input) {
  return rolSchema.safeParse(input);
}