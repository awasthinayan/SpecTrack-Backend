import type { Context } from "hono";
import { LoginUserService, RegisterUserService } from "../Services/userService";

export const RegiterUserController = async (c: Context) => {
  try {
    const data = c.get("validatedData");

    if (!data) {
      return c.json({ message: "Invalid request body" }, 400);
    }

    const result = await RegisterUserService(
      data.name,
      data.email,
      data.password,
    );

    return c.json(result, 201);
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};

export const LoginUserController = async (c: Context) => {
  try {
    const data = c.get("validatedData");

    if (!data) {
      return c.json({ message: "Invalid request body" }, 400);
    }

    const result = await LoginUserService(data.email, data.password);

    return c.json(result, 200);
  } catch (error: any) {
    return c.json({ message: error.message }, 400);
  }
};
