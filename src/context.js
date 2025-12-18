import { verifyToken } from "./auth/jwt.js";
import Trainer from "./models/Trainer.js";

export const context = async ({ req }) => {
  const header = req.headers.authorization || "";

  if (!header) return { user: null };

  try {
    const token = header.replace("Bearer ", "");
    const decoded = verifyToken(token);
    const user = await Trainer.findById(decoded.id);
    return { user };
  } catch {
    return { user: null };
  }
};