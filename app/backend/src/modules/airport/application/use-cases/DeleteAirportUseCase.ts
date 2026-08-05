import { IAirportRepository } from "../../domain/IAirportRepository.js";

export class DeleteAirportUseCase {
    private readonly airportRepo: IAirportRepository
    constructor(airportRepo: IAirportRepository) {
        this.airportRepo = airportRepo
    }

    async exec(id: string): Promise<void> {
        await this.airportRepo.deleteAirport(id)
    }
}