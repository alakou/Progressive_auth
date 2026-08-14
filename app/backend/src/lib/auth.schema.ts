import * as z from "zod"

const schema = {
    email: z.email("Email invalide"),
    password: z
        .string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    requireData: z.string().min(1, "Ce champs ne peut pas etre vide"),
}

export const registerSchema = z.object({
    email: schema.email,
    password: schema.password
})

export const loginSchema = z.object({
    email: z.email().trim(),
    password: schema.requireData
})

export const refreshSchema = z.object({
    refreshToken: schema.requireData
})

export type RegisterSchemaInput = z.infer<typeof registerSchema>
export type LoginSchemaInput = z.infer<typeof loginSchema>
// export type RefreshSchemaInput = z.infer<typeof refreshSchema>

