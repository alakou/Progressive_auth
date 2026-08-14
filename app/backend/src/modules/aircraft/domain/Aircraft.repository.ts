import { Aircraft } from "./Aircraft.js";

export interface CreateAircraftDTO {
    airlineId: string
    model: string
    registration: string
    capacity: number
}

export type UpdateAircraftDTO = Partial<CreateAircraftDTO>

export interface IAircraftRepository {
    findAll(): Promise<Aircraft[]>
    findbyId(id: string): Promise<Aircraft | null>
    createAircraft(data: CreateAircraftDTO): Promise<Aircraft>
    updateAicraft(id: string, data: UpdateAircraftDTO): Promise<Aircraft | null>
    deleteAircraft(id: string): Promise<void>
}