import { Airline } from "./Airline.js"

export interface CreateAirlineDTO {
    icaoCode: string
    name: string
    country: string
    foundedIn: number
}

export type UpdateAirlineDTO = Partial<CreateAirlineDTO>

export interface IAirlineRepository {
    findAllAirline(): Promise<Airline[]>
    findAirlineById(id: string): Promise<Airline | null>
    findAirlineByIcaoCode(icaoCode: string): Promise<Airline | null>
    createAirline(data: CreateAirlineDTO): Promise<Airline>
    updateAirline(id: string, data: UpdateAirlineDTO): Promise<Airline>
    removeAirline(id: string): Promise<void>

}