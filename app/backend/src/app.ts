import compression from 'compression';
import express, { Application, } from 'express';
import { setAirportRouter } from './modules/airport/index.js';
import { setAirlineRouter } from './modules/airline/index.js';
export class App {
    public readonly instance: Application;

    constructor() {
        this.instance = express();
        this.configureMiddlewares();
        this.configAllAirportRoutes();
        this.configureErrorHandler();
    }

    private configAllAirportRoutes(): void {
        this.instance.use("/api/aiport", setAirportRouter())
        this.instance.use("/api/airline", setAirlineRouter())
    }

    private configureErrorHandler(): void {
        this.instance.use((req, res) => {
            res.status(404).json({ error: 'page not found' });
        });
    }

    private configureMiddlewares(): void {
        // Le body est mis en json
        this.instance.use(express.json());
        this.instance.use(express.urlencoded({ extended: true }));
        this.instance.use(compression())

        this.instance.use((req, res, next) => {
            const start = Date.now();
            res.on('finish', () => {
                const data = {
                    duration: `${Date.now() - start} ms`,
                    method: req.method,
                    prot: req.protocol,
                    status: res.statusCode,
                    url: req.url,
                };
                console.log(data);
            });
            next();
        });
    }
}
