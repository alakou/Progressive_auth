import dotenv from 'dotenv';

dotenv.config();

class EnvConfiguration {
    public readonly nodeEnv: string;
    public readonly port: number;
    public readonly jwtAccessSecret = process.env.JWT_ACCESS_SECRET!
    public readonly jwtRefreshSecret = process.env.JWT_REFRESH_SECRET!
    public readonly jwtAccessSecretExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "1m"
    public readonly jwtRefreshSecretExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d"
    public readonly corsAllowedOrigin = process.env.CORS_ALLOWED_ORIGIN || 'http://localhost:5173';

    public get isProd(): boolean {
        return this.nodeEnv === "prod";
    }

    constructor() {
        this.port = +process.env.PORT!;
        this.nodeEnv = process.env.NODE_ENV || "dev";
    }
}

export const env = new EnvConfiguration();
