import { Airline, IAirlineRepository, AirlineDTO, UpdateAirlinetDTO } from "./airline.types.js";

import { prisma } from "@/config/prisma.js";

export class AirlineRepository implements IAirlineRepository {
    async findAllAirline(): Promise<Airline[]> {
        return prisma.airline.findMany({ orderBy: { name: "asc" } })
    }

    async findAirlineById(id: string): Promise<Airline  | null> {
        return prisma.airline.findUnique({ where: { id } })
    }

    async findAirlineByIcaoCode(icaoCode: string): Promise<Airline | null> {
        return prisma.airline.findUnique({ where: { icaoCode } })
    }

    async createAirline(data: AirlineDTO): Promise<Airline> {
        return prisma.airline.create({ data })
    }

    async updateAirline(id: string, data: UpdateAirlinetDTO): Promise<Airline> {
        return prisma.airline.update({ where: { id }, data })
    }

    async removeAirline(id: string): Promise<void> {
        await prisma.airline.delete({ where: { id } })
    }

}