import { Airport, IAirportRepository, CreateAirportDTO, UpdateAirportDTO } from "./airport.types.js";


export class AirportService {
    private readonly airportRepository: IAirportRepository

    constructor(airportRepository: IAirportRepository) {
        this.airportRepository = airportRepository
    }

    // constructor(private readonly airportRepository: IAirportRepository) {}

    async getAllAirport(): Promise<Airport[]> {
        return this.airportRepository.findAllAirport()
    }

    async getAirportById(id: string): Promise<Airport | null> {
        return this.airportRepository.findAirportByID(id)
    }

    async createNewAiport(data: CreateAirportDTO): Promise<Airport> {
        const exist = await this.airportRepository.findAirportByIataCode(data.iataCode)
        if (exist) {
            throw new Error(`Le code IATA ${data.iataCode} est déjà utilisé`);
        }
        return this.airportRepository.createAirport(data)
    }
    async updateExistingAiport(id: string, data: UpdateAirportDTO): Promise<Airport> {
        return this.airportRepository.updateAirport(id, data)
    }
    async removeUniqueAirport(id: string): Promise<void> {
        await this.airportRepository.deleteAirport(id)
    }
}