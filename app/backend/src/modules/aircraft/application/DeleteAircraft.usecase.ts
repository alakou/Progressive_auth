import { IAircraftRepository } from "../domain/Aircraft.repository.js";

export class DeleteAircraft {
    constructor(private readonly aircraftRepo: IAircraftRepository) { }

    async exec(id: string): Promise<void> {
        return this.aircraftRepo.deleteAircraft(id)
    }
}