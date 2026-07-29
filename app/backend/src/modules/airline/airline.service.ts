import { AirlineRepository } from "./airline.repository.js";

import { Airline, AirlineDTO, UpdateAirlinetDTO } from "./airline.types.js";

export class AirlineService {
    private readonly airlineRepo: AirlineRepository
    constructor(airlineRepo: AirlineRepository) {
        this.airlineRepo = airlineRepo
    }

    async getAllAirlines(): Promise<Airline[]> {
        return this.airlineRepo.findAllAirline()
    }

    async getAirlineByIcaoCode(icaoCode: string): Promise<Airline | null> {
        return this.airlineRepo.findAirlineByIcaoCode(icaoCode)
    }

    async getAirlineById(id: string): Promise<Airline | null> {
        return this.airlineRepo.findAirlineById(id)
    }

    async createAirline(data: AirlineDTO): Promise<Airline> {
        const airportByIcaoCode = await this.airlineRepo.findAirlineByIcaoCode(data.icaoCode)
        if (airportByIcaoCode) {
            throw new Error(`Le code ICAO ${data.icaoCode} est déjà utilisé`)
        }
        return this.airlineRepo.createAirline(data)
    }

    async updateAirline(id: string, data: UpdateAirlinetDTO): Promise<Airline> {
        return this.airlineRepo.updateAirline(id, data)
    }

    async removeAirline(id: string): Promise<void> {
        return this.airlineRepo.removeAirline(id)
    }
}