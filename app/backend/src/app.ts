import compression from 'compression';
import express, { Application, } from 'express';
import { initAirporModule } from './modules/airport/index.js';
import { initAirlineModule } from './modules/airline/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { pinoHttp } from 'pino-http';
import { pino_logger } from './config/logger.js';
export class App {
    public readonly instance: Application; 

    constructor() {
        this.instance = express();
        this.configureMiddlewares();
        this.configAllAirportRoutes();
        this.configureErrorHandler();
    }

    private configAllAirportRoutes(): void {
        this.instance.use("/api/airport", initAirporModule())
        this.instance.use("/api/airline", initAirlineModule())
    }

    private configureMiddlewares(): void {
        // 1) Logging HTTP middleware
        this.instance.use(pinoHttp({ logger: pino_logger }));

        // 2) Body parser middleware
        this.instance.use(express.json());
        this.instance.use(express.urlencoded({ extended: true }));

        // 3) Req compression middleware
        this.instance.use(compression())

        // 3) Res process timing middleware
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
    private configureErrorHandler(): void {
        this.instance.use(errorHandler);
    }
}
