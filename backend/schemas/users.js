import z from "zod";

const userSchema = z.object({
  nombres: z.string(),
  apellidos: z.string(),
  edad: z.number().int().positive(),
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