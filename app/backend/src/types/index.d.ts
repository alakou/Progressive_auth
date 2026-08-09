import { TokenPayload } from "@/modules/auth/domain/auth.repository.ts";
import  "express"

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload
        }
    }
}

export {}