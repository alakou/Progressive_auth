import compression from 'compression';

import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

import { rateLimiterGlobal } from './middlewares/rateLimiter.js';

import express, { Application, } from 'express';

import { initAirporModule } from './modules/airport/index.js';
import { initAirlineModule } from './modules/airline/index.js';
import { initAuthModule } from './modules/auth/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { pinoHttp } from 'pino-http';
import { pino_logger } from './config/logger.js';

import { env } from './config/env.js';

export class App {
    public readonly instance: Application;

    constructor() {
        this.instance = express();
        this.configureMiddlewares();
        this.configAPItRoutes();
        this.configureErrorHandler();
    }

    private configAPItRoutes(): void {
        this.instance.use("/api/airport", initAirporModule())
        this.instance.use("/api/airline", initAirlineModule())
        this.instance.use("/api/auth", initAuthModule())
    }

    private configureMiddlewares(): void {
        this.instance.disable("x-powered-by")

        this.instance.use(pinoHttp({ logger: pino_logger }));

       
         this.instance.use(helmet())

        this.instance.use(cors({
            origin: env.corsAllowedOrigin,
            credentials: true

        }))

        this.instance.use(express.json({limit: "10kb"}));
        this.instance.use(express.urlencoded({ extended: true }));

        this.instance.use(hpp())

 
        this.instance.use(rateLimiterGlobal)

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
    private configureErrorHandler(): void {
        this.instance.use(errorHandler);
    }
}
