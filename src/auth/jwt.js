import jwt from "jsonwebtoken";

export const createToken = (trainer) =>
  jwt.sign(
    { id: trainer._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

export const verifyToken = (token) =>
  jwt.verify(token, process.env.JWT_SECRET);