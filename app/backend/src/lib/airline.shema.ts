import * as z from "zod";

export const CreateAirlineSchema = z.object({
    icaoCode: z.string()
        .length(3, "Le code IATA doit faire exactement 3 caractères")
        .uppercase()
        .regex(/^[A-Z]{3}$/, "Le code ICAO doit être en majuscules"),
    name: z.string().min(2).max(100),
    country: z.string().min(2).max(100),
    foundedIn: z.string().regex(/^[0-9]{4}$/),
})

export const UpdateAirlineSchema = CreateAirlineSchema.partial()
export type createAirlineInput = z.infer<typeof CreateAirlineSchema>
export type updateAirlineInput = z.infer<typeof UpdateAirlineSchema>