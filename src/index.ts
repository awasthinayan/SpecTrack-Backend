import { Hono } from "hono";
import { connectDB } from "./Configs/dbConfig";
import { PORT, FRONTEND_URL } from "./Configs/serverConfig";
import router from "./Routes/allRoutes";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";

const app = new Hono();

await connectDB();

app.use(
  "*",
  cors({
    origin: FRONTEND_URL || "http://localhost:3000",
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("*", logger());
app.use("*", secureHeaders());

app.route("/api/v1", router);

app.get("/", (c) => {
  return c.text("Hello World!");
});

export default {
  port: PORT,
  fetch: app.fetch,
};
