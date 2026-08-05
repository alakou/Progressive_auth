import { ConflictError } from "@/errors/AppError.js";
import { AirportProps } from "../../domain/Airport.js";
import { CreateAirportDTO, IAirportRepository } from "../../domain/IAirportRepository.js";

export class CreateAirportUseCase {
    private readonly airportRepo: IAirportRepository
    constructor(airportRepo: IAirportRepository) {
        this.airportRepo = airportRepo
    }

    async exec(data: CreateAirportDTO): Promise<AirportProps> {
        const existing = await this.airportRepo.findAirportByIataCode(data.iataCode)
        if (existing) throw new ConflictError(`Le code IATA ${data.iataCode} est déjà utilisé`);
        return this.airportRepo.createAirport(data)
    }
}