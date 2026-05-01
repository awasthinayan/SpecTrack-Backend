import type { Context, Next } from "hono";
import jwt from "jsonwebtoken";
import UserRepository from "../Repository/userRepo";

const userRepo = new UserRepository();

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!token) {
      return c.json({ message: "Unauthorized" }, 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;

    const userId = decoded.id;

    if (!userId) {
      return c.json({ message: "Invalid token" }, 401);
    }

    const user = await userRepo.GetUserById(userId);

    if (!user) {
      return c.json({ message: "User not found" }, 401);
    }

    c.set("userId", userId);
    c.set("user", decoded);

    await next();
  } catch (error) {
    return c.json({ message: "Invalid token" }, 401);
  }
};
