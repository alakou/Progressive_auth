import { LoginSchemaInput, RegisterSchemaInput } from "@/lib/auth.schema.js";

export interface TokensType {
    accessToken: string,
    refreshToken: string,   
}


export interface TokenPayload {
  userId: string;
  role: string;
}

export type AccessTokenPayload = TokenPayload & { type: "access" }
export type RefreshTokenPayload = { userId: string, type: "refresh" }


export interface IAuthRepository {
    register(input: RegisterSchemaInput): Promise<void>
    login(input: LoginSchemaInput): Promise<TokensType>
    refresh(refreshToken: string): Promise<TokensType>
    logout(refreshToken: string): Promise<void>
}