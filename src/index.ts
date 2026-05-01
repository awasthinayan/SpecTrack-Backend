import { Hono } from "hono";
import { connectDB } from "./Configs/dbConfig";
import { PORT } from "./Configs/serverConfig";
import router from "./Routes/allRoutes";


const app = new Hono();

connectDB();

app.route("/api/v1", router);

app.get("/", (c) => {
  return c.text("Hello World!");
});

export default {
  port: PORT,
  fetch: app.fetch,
};
