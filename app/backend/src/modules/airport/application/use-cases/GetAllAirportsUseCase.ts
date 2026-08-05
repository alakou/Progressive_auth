import { AirportProps } from "../../domain/Airport.js";
import { IAirportRepository } from "../../domain/IAirportRepository.js";

export class GetAllAirportsUseCase {
    private readonly airportRepo: IAirportRepository
    constructor(airportRepo: IAirportRepository) {
        this.airportRepo = airportRepo
    }

    async exec(): Promise<AirportProps[]> {
        return this.airportRepo.findAllAirport()
    }
}