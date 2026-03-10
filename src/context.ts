import { verifyToken } from "./auth/jwt";
import Trainer, { ITrainer } from "./models/Trainer";

interface ContextArgs {
  req: any;
}

export const context = async ({ req }: ContextArgs) => {
  const header = req.headers.authorization || "";

  if (!header) return { user: null };

  try {
    const token = header.replace("Bearer ", "");
    const decoded: any = verifyToken(token);

    const user = await Trainer.findById(decoded.id);

    return { user };
  } catch {
    return { user: null };
  }
};
