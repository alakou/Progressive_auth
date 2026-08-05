import { ConflictError } from "@/errors/AppError.js";
import { Airline } from "../../domain/Airline.js";
import { CreateAirlineDTO, IAirlineRepository } from "../../domain/IAirlineRepository.js";

export class CreateAirline {
    private readonly airlineRepo: IAirlineRepository
    constructor(airlineRepo: IAirlineRepository) {
        this.airlineRepo = airlineRepo
    }

    async exec(data: CreateAirlineDTO): Promise<Airline> {
        const existing = await this.airlineRepo.findAirlineByIcaoCode(data.icaoCode)
        if (existing) {
            throw new ConflictError(`Le code IATA ${data.icaoCode} est déjà utilisé`)
        }
        return this.airlineRepo.createAirline(data)
    }
}