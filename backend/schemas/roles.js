import z from "zod";

const rolSchema = z.object({
  rolName: z.string(),
});

export function validateRol(input) {
  return rolSchema.safeParse(input);
}