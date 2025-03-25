import { Hono } from "hono";
import { prisma } from "../extras/prisma";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";

export const userRoutes = new Hono();

userRoutes.get("/",async (context, next) => {
    const token = context.req.header("token");

    if (!token) {
      return context.json({ error: "Unauthorized" }, 401);
    }

    try {
      const verified = jwt.verify(token, jwtSecretKey);
    } catch (error) {
      return context.json({ error: "Unauthorized" }, 401);
    }
    await next();
  }, async (c) => {
  const users = await prisma.user.findMany();
  return c.json(users, 200);
});