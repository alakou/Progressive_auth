import { AirportProps } from "../../domain/Airport.js";
import { IAirportRepository } from "../../domain/IAirportRepository.js";

export class GetAirportByIdUseCase {
    private readonly airportRepo: IAirportRepository
    constructor(airportRepo: IAirportRepository) {
        this.airportRepo = airportRepo
    }

    async exec(id: string): Promise<AirportProps | null> {
        return this.airportRepo.findAirportByID(id)
    }
}