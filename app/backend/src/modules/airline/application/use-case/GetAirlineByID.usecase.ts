import { Airline } from "../../domain/Airline.js";
import { IAirlineRepository } from "../../domain/IAirlineRepository.js";

export class GetAirlineByID {
    private readonly airlineRepo: IAirlineRepository
    constructor(airlineRepo: IAirlineRepository) {
        this.airlineRepo = airlineRepo
    }

    async exec(id: string): Promise<Airline | null> {
        return this.airlineRepo.findAirlineById(id)
    }
}