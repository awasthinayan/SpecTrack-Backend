import { z } from "zod";

export const zodMiddleware = (schema: z.ZodSchema) => {
  return async (c: any, next: any) => {
    try {
      const raw = await c.req.text();

      if (!raw) {
        return c.json({ message: "Empty body" }, 400);
      }

      const body = JSON.parse(raw);

      try {
        const validatedData = schema.parse(body);
        c.set("validatedData", validatedData);
        await next();
      } catch (validationError: any) {
        console.log("Validation errors:", validationError.errors);
        return c.json(
          {
            message: "Validation Error",
            errors: validationError.errors,
          },
          400,
        );
      }
    } catch (error: any) {
      console.log("Parse error:", error.message);
      return c.json(
        {
          message: "Invalid JSON",
          error: error.message,
        },
        400,
      );
    }
  };
};
