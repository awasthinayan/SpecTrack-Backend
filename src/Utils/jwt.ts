import jwt from "jsonwebtoken";
import { jwtSecret } from "../Configs/serverConfig";

export interface TokenPayload {
  id: string;
}

export const generateToken = (payload: TokenPayload) => {
  return jwt.sign(payload, jwtSecret, {
    expiresIn: "7d",
  });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, jwtSecret);
};
