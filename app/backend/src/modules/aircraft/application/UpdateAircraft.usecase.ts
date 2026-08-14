import { Aircraft } from "../domain/Aircraft.js";
import { IAircraftRepository, UpdateAircraftDTO } from "../domain/Aircraft.repository.js";

export class UpdateAircraft {
    constructor(private readonly aircraftRepo: IAircraftRepository) { }

    async exec(id: string, data: UpdateAircraftDTO): Promise<Aircraft | null> {
        return this.aircraftRepo.updateAicraft(id, data)
    }
}