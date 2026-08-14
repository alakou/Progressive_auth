import { Aircraft } from "../domain/Aircraft.js";
import { IAircraftRepository } from "../domain/Aircraft.repository.js";

export class GetAircraftById {
    constructor(private readonly aircraftRepo: IAircraftRepository) { }

    async exec(id: string): Promise<Aircraft | null> {
        return this.aircraftRepo.findbyId(id)
    }
}