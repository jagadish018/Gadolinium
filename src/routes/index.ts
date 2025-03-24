import { Hono } from "hono";

export const hono = new Hono();


hono.get("/health", (c) => {
  return c.json(
    {
      status: "ok",
    },
    200
  );
});