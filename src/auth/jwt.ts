import jwt from "jsonwebtoken";
import { ITrainer } from "../models/Trainer";

export const createToken = (trainer: ITrainer): string =>
  jwt.sign(
    { id: trainer._id },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

export const verifyToken = (token: string): any =>
  jwt.verify(token, process.env.JWT_SECRET as string);
