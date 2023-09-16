"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encryptByKey = exports.encrypt = void 0;
const jwt_security_1 = require("../../middleware/security/jwt.security");
const utils_1 = require("../utils/utils");
/**
 * Takes in an object and encrypts it using a randomly generated string secret key.
 * @param plainstring
 * @returns [string, string] - string tuple containing the encrypted string and the secret key used to encrypt it.
 */
const encrypt = (userObject) => {
    const secretKey = (0, utils_1.getRandomString)();
    return [(0, jwt_security_1.jwtEncode)(userObject, secretKey), secretKey];
};
exports.encrypt = encrypt;
/**
 * Takes in a plain string and a key, and encrypts it using a randomly generated string secret key.
 * @param plainstring
 * @param encryptKey
 * @returns [string, string] - string tuple containing the encrypted string and the secret key used to encrypt it.
 */
const encryptByKey = (userObject, encryptKey) => {
    return (0, jwt_security_1.jwtEncode)(userObject, encryptKey);
};
exports.encryptByKey = encryptByKey;
/**
 * Decrypts then provided token with the secret key.
 * @param token
 * @param secretKey
 * @returns - decrypted contents
 */
const decrypt = (token, secretKey) => {
    return (0, jwt_security_1.jwtDecode)(token, secretKey);
};
exports.decrypt = decrypt;
