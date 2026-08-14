import compression from 'compression';

import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';

import { xRequestId } from './middlewares/setrequestId.js';
import { rateLimiterGlobal } from './middlewares/rateLimiter.js';

import express, { Application, } from 'express';

import { initAirporModule } from './modules/airport/index.js';
import { initAirlineModule } from './modules/airline/index.js';
import { initAuthModule } from './modules/auth/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { pinoHttp } from 'pino-http';
import { pino_logger } from './config/logger.js';

import { initAircraftModule } from './modules/aircraft/index.js';
import { initUserModule } from './modules/user/index.js';

export class App {
    public readonly instance: Application;

    constructor() {
        this.instance = express();
        this.configureMiddlewares();
        this.configAPItRoutes();
        this.configureErrorHandler();
    }

    // Middleware config
    private configureMiddlewares(): void {
        this.instance.use(xRequestId())

        this.instance.disable("x-powered-by")

        this.instance.use(pinoHttp({ logger: pino_logger }));

        this.instance.use(helmet())

        this.instance.use(cors({
            origin: "*",
            credentials: true

        }))

        this.instance.use(express.json({ limit: "50mb" }));
        this.instance.use(express.urlencoded({ extended: true, limit: "50mb"}));

        this.instance.use(hpp())

        this.instance.use(rateLimiterGlobal)

        this.instance.use(compression({threshold: "1kb"}))
    }

    // Route config
    private configAPItRoutes(): void {
        this.instance.use("/api/airport", initAirporModule())
        this.instance.use("/api/airline", initAirlineModule())
        this.instance.use("/api/aircraft", initAircraftModule())
        this.instance.use("/api/auth", initAuthModule())
        this.instance.use("/api/admin", initUserModule())
    }

    // Global error config
    private configureErrorHandler(): void {
        this.instance.use(errorHandler);
    }
}

// this.instance.use((req, res, next) => {
//             const start = Date.now();
//             res.on('finish', () => {
//                 const data = {
//                     duration: `${Date.now() - start} ms`,
//                     method: req.method,
//                     prot: req.protocol,
//                     status: res.statusCode,
//                     url: req.url,
//                 };
//                 console.log(data);
//             });
//             next();
//         });