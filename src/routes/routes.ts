import { Hono } from "hono";
import { authenticationRoutes } from "./authentication-routes";
import { userRoutes } from "./users-routes";
import { logger } from "hono/logger";

export const allRoutes = new Hono();

allRoutes.use(async (c, next) => {
  console.log("HTTP METHOD", c.req.method);
  console.log("URL", c.req.url);
  console.log("HEADERS", c.req.header());

  await next();
});

allRoutes.route("/authentication", authenticationRoutes);
allRoutes.route("/users", userRoutes);

allRoutes.get("/health", async (c) => {
  console.log("Health checked");

  return c.json({ status: "ok" });
});
