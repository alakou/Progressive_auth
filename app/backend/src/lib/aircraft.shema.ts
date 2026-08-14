import z from "zod"

export const CreateAircraftSchema = z.object({
    airlineId: z.string(),
    model: z.string().length(7).regex(/^\d{3}-\d{3}$/),
    registration: z.string().length(6).regex(/^\d{2}-[A-Z0-9]{3}$/).toUpperCase(),
    capacity: z.string().regex(/^\d{3,4}$/)
})

export const UpdateAircraftSchema = CreateAircraftSchema.partial()

export type CreateAircraftInput = z.infer<typeof CreateAircraftSchema>
export type UpdateAircraftInput = z.infer<typeof UpdateAircraftSchema>
