import { AirportProps } from "../../domain/Airport.js";
import { IAirportRepository, UpdateAirportDTO } from "../../domain/IAirportRepository.js";

export class UpdateAirportUseCase {
    private readonly airportRepo: IAirportRepository
    constructor(airportRepo: IAirportRepository) {
        this.airportRepo = airportRepo
    }

    async exec(id: string, data: UpdateAirportDTO): Promise<AirportProps | null> {
        return this.airportRepo.updateAirport(id, data)
    }
}