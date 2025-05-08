import { z } from 'zod'

export const createUserSchema = z.object({
    name: z.string().min(3, "O nome deve ter no minímo 3 letras"),
    email: z.string().email("Email Inválido"),
    password: z.string()
    .min(6, "A senha deve ter pelo menos 6 letras")
    .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maíuscula")
});

export const updateUserSchema = z.string({
    name: z.string().min(3, "O nome deve ter pelo menos 3 letras").optional(),
    email: z.string().email("Email Inválido").optional(),
    password: z.string()
    .min(6, "A senha deve ter pelo menos 6 letras")
    .regex(/[A-Z]/, "A senha deve ter pelo menos uma letra maíuscula")
    .optional()
})