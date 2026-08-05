export interface AirlineProps {
    id?: string,
    icaoCode: string
    name: string
    country: string
    foundedIn: number | null
}


export class Airline {
    public readonly id?: string
    public readonly icaoCode: string
    public readonly name: string
    public readonly country: string
    public readonly foundedIn: number | null

    constructor(props: AirlineProps) {
        this.id = props.id
        this.name = props.name
        this.icaoCode = props.icaoCode
        this.country = props.country
        this.foundedIn = props.foundedIn
    }
}
