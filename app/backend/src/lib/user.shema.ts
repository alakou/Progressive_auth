import z from "zod"

const ProfileShema = z.object({
    firstname: z.string().min(4).optional(),
    lastname: z.string().min(4).optional(),
    profession: z.string().min(1).optional(),
})

export const CreateUserSchema = z.object({
    email: z.email("Entrer email valid"),
    password: z.string()
        .min(8, "Le mot de passe doit contenir au moins 8 caractères")
        .regex(/[A-Z]/, "Le mot de passe doit contenir au moins une majuscule")
        .regex(/[0-9]/, "Le mot de passe doit contenir au moins un chiffre"),
    role: z.enum(["USER", "ADMIN", "STAFF"]),
    profile: ProfileShema.optional()
})

export const UpdateUserSchema = CreateUserSchema.partial()

export type CreateUserInput = z.infer<typeof CreateUserSchema>
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>



