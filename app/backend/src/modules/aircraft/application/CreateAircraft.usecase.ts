import { Aircraft } from "../domain/Aircraft.js";
import { CreateAircraftDTO, IAircraftRepository } from "../domain/Aircraft.repository.js";

export class CreateAircraft {
    constructor(private readonly aircraftRepo: IAircraftRepository) { }

    async exec(data: CreateAircraftDTO): Promise<Aircraft> {
        return this.aircraftRepo.createAircraft(data)
    }
}