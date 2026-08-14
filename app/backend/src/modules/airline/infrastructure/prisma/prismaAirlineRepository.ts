import { prisma } from "@/config/prisma.js";
import { IAirlineRepository, CreateAirlineDTO, UpdateAirlineDTO } from "../../domain/IAirlineRepository.js";
import { Airline } from "../../domain/Airline.js";
import { ValidationError } from "@/errors/AppError.js";


export class PrismaAirlineRepository implements IAirlineRepository {
    // Permet la suppression de la persistance
    private mapRecordToDomain(record: Airline): Airline {
        const { id, icaoCode, name, country, foundedIn } = record
        return new Airline({ id, icaoCode, name, country, foundedIn })
    }


    async findAllAirline(): Promise<Airline[]> {
        const datas = await prisma.airline.findMany({ orderBy: { name: "asc" } })
        return datas.map((data) => this.mapRecordToDomain(data))
    }

    async findAirlineById(id: string): Promise<Airline | null> {
        const data = await prisma.airline.findUnique({ where: { id } })
        if (!data) {
            throw new ValidationError(`Aucune donnée trouver à l'id: ${id}`)
        }
        return this.mapRecordToDomain(data)
    }

    async findAirlineByIcaoCode(icaoCode: string): Promise<Airline | null> {
        return prisma.airline.findUnique({ where: { icaoCode } })
    }

    async createAirline(data: CreateAirlineDTO): Promise<Airline> {
        return prisma.airline.create({ data })
    }

    async updateAirline(id: string, data: UpdateAirlineDTO): Promise<Airline> {
        return prisma.airline.update({ where: { id }, data })
    }

    async removeAirline(id: string): Promise<void> {
        await prisma.airline.delete({ where: { id } })
    }

}