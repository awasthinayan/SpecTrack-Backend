import type { Context } from "hono";
import {
  GetCurrentUserService,
  LoginUserService,
  LogoutUserService,
  RegisterUserService,
} from "../Services/userService";
import {
  RequestPasswordResetService,
  ValidatePasswordResetTokenService,
  ResetPasswordService,
} from "../Services/passwordResetService";

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

export const getCurrentUserController = async (c: Context) => {
  try {
    const authHeader = c.req.header("Authorization");

    if (!authHeader) {
      return c.json(
        {
          message: "Authorization header is required",
        },
        400,
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return c.json(
        {
          message: "Invalid token format",
        },
        400,
      );
    }

    const result = await GetCurrentUserService(token);

    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
      },
      400,
    );
  }
};

export const LogoutUserController = async (c: Context) => {
  try {
    const result = await LogoutUserService();

    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      {
        message: error.message,
      },
      400,
    );
  }
};

export const RequestPasswordResetController = async (c: Context) => {
  try {
    const data = await c.req.json();

    if (!data || !data.email) {
      return c.json({ message: "Email is required" }, 400);
    }

    const result = await RequestPasswordResetService(data.email);

    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      { message: error.message || "Failed to request password reset" },
      400,
    );
  }
};

export const ValidatePasswordResetTokenController = async (c: Context) => {
  try {
    const userId = c.req.param("userId");
    const token = c.req.param("token");

    if (!userId || !token) {
      return c.json({ message: "User ID and token are required" }, 400);
    }

    const result = await ValidatePasswordResetTokenService(userId, token);

    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      { message: error.message || "Failed to validate reset token" },
      400,
    );
  }
};

export const ResetPasswordController = async (c: Context) => {
  try {
    const userId = c.req.param("userId");
    const token = c.req.param("token");
    const data = await c.req.json();

    if (!userId || !token || !data || !data.newPassword) {
      return c.json(
        { message: "User ID, token, and new password are required" },
        400,
      );
    }

    const result = await ResetPasswordService(userId, token, data.newPassword);

    return c.json(result, 200);
  } catch (error: any) {
    return c.json(
      { message: error.message || "Failed to reset password" },
      400,
    );
  }
};
