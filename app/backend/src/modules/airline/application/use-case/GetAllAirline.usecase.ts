import { Airline } from "../../domain/Airline.js";
import { IAirlineRepository } from "../../domain/IAirlineRepository.js";

export class GetAllAirline {
    private readonly airlineRepo: IAirlineRepository
    constructor(airlineRepo: IAirlineRepository) {
        this.airlineRepo = airlineRepo
    }

    async exec(): Promise<Airline[]> {
        return this.airlineRepo.findAllAirline()
    }
}