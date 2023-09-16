"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomString = void 0;
const crypto_1 = require("crypto");
const getRandomString = () => (0, crypto_1.randomBytes)(8).toString("hex");
exports.getRandomString = getRandomString;
