import { Request, Response } from "express";
import { GetAllAirportsUseCase } from "../../application/use-cases/GetAllAirportsUseCase.js";
import { GetAirportByIdUseCase } from "../../application/use-cases/GetAirportByIdUseCase.js";
import { CreateAirportUseCase } from "../../application/use-cases/CreateAirportUseCase.js";
import { UpdateAirportUseCase } from "../../application/use-cases/UpdateAirportUseCase.js";
import { DeleteAirportUseCase } from "../../application/use-cases/DeleteAirportUseCase.js";
import { CreateAirportDTO, UpdateAirportDTO } from "../../domain/IAirportRepository.js";


export class AirportController {
  constructor(
    private readonly getAllAirportsUseCase: GetAllAirportsUseCase,
    private readonly getAirportByIdUseCase: GetAirportByIdUseCase,
    private readonly createAirportUseCase: CreateAirportUseCase,
    private readonly updateAirportUseCase: UpdateAirportUseCase,
    private readonly deleteAirportUseCase: DeleteAirportUseCase
  ) {}

  getAll = async (_req: Request, res: Response): Promise<void> => {
    const airports = await this.getAllAirportsUseCase.exec();
    res.status(200).json(airports);
  }; 

  getById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id.toString();
    const airport = await this.getAirportByIdUseCase.exec(id);
    res.status(200).json(airport);
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const body: CreateAirportDTO = req.body;
    const airport = await this.createAirportUseCase.exec(body);
    res.status(201).json(airport);
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id.toString();
    const body: UpdateAirportDTO = req.body;
    const airport = await this.updateAirportUseCase.exec(id, body);
    res.status(200).json(airport);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id.toString();
    await this.deleteAirportUseCase.exec(id);
    res.status(200).json({ message: "Airport deleted successfully" });
  };
}