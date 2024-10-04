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

export function validateUser (input) {
  return userSchema.safeParse(input);
}
