import { JwtPayload } from "jsonwebtoken";
import { jwtDecode, jwtEncode } from "../../middleware/security/jwt.security"
import { getRandomString } from "../utils/utils"

/**
 * Takes in an object and encrypts it using a randomly generated string secret key.
 * @param plainstring 
 * @returns [string, string] - string tuple containing the encrypted string and the secret key used to encrypt it.
 */
export const encrypt = (userObject: any): [string, string] => {
    const secretKey: string = getRandomString();
    return [jwtEncode(userObject, secretKey), secretKey];
}

/**
 * Takes in a plain string and a key, and encrypts it using a randomly generated string secret key.
 * @param plainstring 
 * @param encryptKey
 * @returns [string, string] - string tuple containing the encrypted string and the secret key used to encrypt it.
 */
export const encryptByKey = (userObject: any, encryptKey: string): string => {
    return jwtEncode(userObject, encryptKey);
}

/**
 * Decrypts then provided token with the secret key.
 * @param token 
 * @param secretKey 
 * @returns - decrypted contents
 */
export const decrypt = (token: string, secretKey: string): string | JwtPayload => {
    return jwtDecode(token, secretKey);
}