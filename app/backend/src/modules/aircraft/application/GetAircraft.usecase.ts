import { Aircraft } from "../domain/Aircraft.js";
import { IAircraftRepository } from "../domain/Aircraft.repository.js";

export class GetAircraft {
    constructor(private readonly aircraftRepo: IAircraftRepository) { }

    async exec(): Promise<Aircraft[]> {
        return this.aircraftRepo.findAll()
    }
}