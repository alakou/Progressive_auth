import { IAirlineRepository } from "../../domain/IAirlineRepository.js";

export class DeleteAirline {
    private readonly airlineRepo: IAirlineRepository
    constructor(airlineRepo: IAirlineRepository) {
        this.airlineRepo = airlineRepo
    }

    async exec(id: string): Promise<void> {
        await this.airlineRepo.removeAirline(id)
    }
}