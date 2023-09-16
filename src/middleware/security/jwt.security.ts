import { JwtPayload, sign, verify } from "jsonwebtoken";

export const jwtEncode = (object: any, secret: string): string => sign(object, secret);

export const jwtDecode = (token: any, secret: string): string | JwtPayload => verify(token, secret);