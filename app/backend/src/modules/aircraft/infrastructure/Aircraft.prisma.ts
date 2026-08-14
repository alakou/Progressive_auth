import { prisma } from "@/config/prisma.js";
import { CreateAircraftDTO, IAircraftRepository, UpdateAircraftDTO } from "../domain/Aircraft.repository.js";
import { Aircraft } from "../domain/Aircraft.js";
import { NotFoundPage } from "@/errors/AppError.js";

export class AircraftPrismaConfig implements IAircraftRepository {

    private mapRecordToDomain(records: Aircraft): Aircraft {
        const { id, airlineId, model, registration, capacity } = records
        return new Aircraft({ id, airlineId, model, registration, capacity })
    }

    async findAll(): Promise<Aircraft[]> {
        const records = await prisma.aircraft.findMany({ orderBy: { model: "asc" } })
        return records.map((r) => this.mapRecordToDomain(r))
    }

    async findbyId(id: string): Promise<Aircraft | null> {
        const record = await prisma.aircraft.findUnique({ where: { id } })
        if (!record) throw new NotFoundPage("Record not found")
        return this.mapRecordToDomain(record)
    }

    async createAircraft(data: CreateAircraftDTO): Promise<Aircraft> {
        return prisma.aircraft.create({ data })
    }

    async updateAicraft(id: string, data: UpdateAircraftDTO): Promise<Aircraft | null> {
        return prisma.aircraft.update({ where: { id }, data })


    }

    async deleteAircraft(id: string): Promise<void> {
        await prisma.aircraft.delete({ where: { id } })
    }
}