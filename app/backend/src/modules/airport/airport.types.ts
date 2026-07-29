import { Airport } from "../../../generated/prisma/client.js";

export type { Airport }

export interface IAirportRepository {
    findAllAirport(): Promise<Airport[]>,
    findAirportByID(id: string): Promise<Airport | null>,
    findAirportByIataCode(iatacode: string): Promise<Airport | null>
    createAirport(data: CreateAirportDTO): Promise<Airport>
    updateAirport(id: string, data: UpdateAirportDTO): Promise<Airport>
    deleteAirport(id: string): Promise<void>
}

export interface CreateAirportDTO {
    iataCode: string,
    name: string,
    city: string,
    country: string,
}

export type UpdateAirportDTO = Partial<CreateAirportDTO>