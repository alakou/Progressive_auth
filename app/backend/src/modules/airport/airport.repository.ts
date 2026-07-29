import { prisma } from "@/config/prisma.js";

import { Airport, IAirportRepository, CreateAirportDTO, UpdateAirportDTO } from "./airport.types.js";

export class AirportRepository implements IAirportRepository {
    async findAllAirport(): Promise<Airport[]> {
        return prisma.airport.findMany({ orderBy: { name: "asc" } })
    }
    async findAirportByID(id: string): Promise<Airport | null> {
        return prisma.airport.findUnique({ where: { id } })
    }
    async findAirportByIataCode(iataCode: string): Promise<Airport | null> {
        return prisma.airport.findUnique({ where: { iataCode } })
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