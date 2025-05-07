import {z} from 'zod';

export const createProductSchema = z.object({
    name: z.string().min(3, "O nome deve ter no minímo 3 letras"),
    price: z.number().gt(0, "O preço tem que ser maior que 0"),
    description: z.string().optional(),
    stock: z.number().min(0, "O estoque não pode ser negativo")
})