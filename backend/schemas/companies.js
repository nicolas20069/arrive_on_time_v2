import z from "zod";

const companySchema = z.object({
  companyName: z.string(),
  userAdminId: z.number().int(),
  adminId: z.number().int(),
});

export function validateCompany(input) {
  return companySchema.safeParse(input);
}