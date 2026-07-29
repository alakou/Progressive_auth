import { Airline } from "../../../generated/prisma/client.js";

export type { Airline }

export interface IAirlineRepository {
    findAllAirline(): Promise<Airline[]>
    findAirlineById(id: string): Promise<Airline  | null>
    findAirlineByIcaoCode(icaoCode: string): Promise<Airline  | null>
    createAirline(data: AirlineDTO): Promise<Airline>
    updateAirline(id: string, data: UpdateAirlinetDTO): Promise<Airline>
    removeAirline(id: string): Promise<void>
}

export interface AirlineDTO {
    icaoCode: string,
    name: string,
    country: string,
    foundedIn: number
}

export type UpdateAirlinetDTO = Partial<AirlineDTO>