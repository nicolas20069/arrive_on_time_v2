import z from "zod";

const userSchema = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  fechaNacimiento: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  cedula: z.number(),
  correo: z.string().email(),
  direccion: z.string().optional(),
  telefono: z.number().int().positive(),
  contraseña: z.string().min(6),
  empresaId: z.number().int(),
  rolId: z.number().int(),
  adminId: z.number().int(),
});

const userSchemaWithoutPassword = userSchema.omit({ contraseña: true });

export function validateUser(input) {
  return userSchema.safeParse(input);
}

export function validateUserUpdate(input) {
  return userSchemaWithoutPassword.partial().safeParse(input);
}