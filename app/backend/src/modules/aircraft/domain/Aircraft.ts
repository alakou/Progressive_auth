interface Aircraftprops {
    id?: string
    airlineId: string
    model: string
    registration: string
    capacity: number
}


export class Aircraft {
    public readonly id?: string
    public readonly airlineId: string
    public readonly model: string
    public readonly registration: string
    public readonly capacity: number

    constructor(aircraft: Aircraftprops) {
        this.id = aircraft.id
        this.airlineId = aircraft.airlineId
        this.model = aircraft.model
        this.registration = aircraft.registration
        this.capacity = aircraft.capacity
    }
}