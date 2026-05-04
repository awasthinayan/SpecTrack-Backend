import { Hono } from "hono";
import { connectDB } from "./Configs/dbConfig";
import { PORT } from "./Configs/serverConfig";
import router from "./Routes/allRoutes";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";

const app = new Hono();

await connectDB();

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