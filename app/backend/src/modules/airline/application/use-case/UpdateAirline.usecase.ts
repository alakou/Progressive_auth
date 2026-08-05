import { Airline } from "../../domain/Airline.js";
import { IAirlineRepository, UpdateAirlineDTO } from "../../domain/IAirlineRepository.js";

export class UpdateAirline {
    private readonly airlineRepo: IAirlineRepository
    constructor(airlineRepo: IAirlineRepository) {
        this.airlineRepo = airlineRepo
    }

    async exec(id: string, data: UpdateAirlineDTO): Promise<Airline | null> {
        return this.airlineRepo.updateAirline(id, data)
    }
}