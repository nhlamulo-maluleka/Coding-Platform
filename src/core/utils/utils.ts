import { randomBytes } from "crypto";

export const getRandomString = () => randomBytes(8).toString("hex");