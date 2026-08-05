export interface AirportProps {
    id?: string;
    iataCode: string;
    name: string; 
    city: string;
    country: string
}

export class Airport {
    public readonly id?: string
    public readonly iataCode: string
    public readonly name: string
    public readonly city: string
    public readonly country: string

    constructor(airport: AirportProps) {
        this.id = airport.id
        this.iataCode = airport.iataCode.toLocaleUpperCase()
        this.name = airport.name
        this.city = airport.city
        this.country = airport.country
    }
}