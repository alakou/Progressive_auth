import z from "zod";

export const createAiportShema = z.object({
    iataCode: z.string()
        .length(3, 'Le code IATA doit faire exactement 3 caractères')
        .regex(/^[A-Z]{3}$/, 'Le code IATA doit être en majuscules'),
    name: z.string().min(2).max(100),
    city: z.string().min(2).max(100),
    country: z.string().min(2).max(100),
})

export type CreateAirportInput = z.infer<typeof createAiportShema>

export const updateAirportSchema = createAiportShema.partial()

export type UpdateAirportInput = z.infer<typeof updateAirportSchema>
