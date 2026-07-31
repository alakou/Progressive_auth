import pino from "pino";
import { env } from "./env.js";

export const pino_logger = pino({
    level: env.isProd ? "info" : "debug",
    transport: env.isProd ? undefined
        : { target: 'pino-pretty', options: { colorize: true } },
})