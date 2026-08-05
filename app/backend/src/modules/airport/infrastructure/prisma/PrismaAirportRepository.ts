import { prisma } from "@/config/prisma.js";
import { IAirportRepository, CreateAirportDTO, UpdateAirportDTO } from "../../domain/IAirportRepository.js";
import { Airport } from "../../domain/Airport.js";
import { ValidationError } from "@/errors/AppError.js";

export class PrismaAirportRepository implements IAirportRepository {
    private mapRecordToDomain(record: Airport): Airport {
        const strictRecord = {
            id: record.id,
            iataCode: record.iataCode,
            name: record.name,
            city: record.city,
            country: record.country
        }
        return new Airport(strictRecord)
    }

    async findAllAirport(): Promise<Airport[]> {
        const datas = await prisma.airport.findMany({ orderBy: { name: "asc" } })
        return datas.map(
            (data) =>
                this.mapRecordToDomain(data)
        );
        // return prisma.airport.findMany({ orderBy: { name: "asc" } })
    }
    async findAirportByID(id: string): Promise<Airport | null> {
        const data = await prisma.airport.findUnique({ where: { id } })
        if (!data) {
            throw new ValidationError(`Aucune donnée trouver à l'id: ${id}`)
        }
        return this.mapRecordToDomain(data)
    }
    async findAirportByIataCode(iataCode: string): Promise<Airport | null> {
        return await prisma.airport.findUnique({ where: { iataCode } })
    }
    async createAirport(data: CreateAirportDTO): Promise<Airport> {
        return prisma.airport.create({ data })
    }
    async updateAirport(id: string, data: UpdateAirportDTO): Promise<Airport> {
        return prisma.airport.update({ where: { id }, data })
    }
    async deleteAirport(id: string): Promise<void> {
        await prisma.airport.delete({ where: { id } })
    }
}