"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtDecode = exports.jwtEncode = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const jwtEncode = (object, secret) => (0, jsonwebtoken_1.sign)(object, secret);
exports.jwtEncode = jwtEncode;
const jwtDecode = (token, secret) => (0, jsonwebtoken_1.verify)(token, secret);
exports.jwtDecode = jwtDecode;
