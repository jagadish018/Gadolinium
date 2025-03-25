import { Hono } from "hono";
import { prisma } from "../extras/prisma";
import { tokenMiddleware } from "./middlewares/token-middlewares";
import { getAllUsers } from "../controllers/users/user-controller";

export const userRoutes = new Hono();

userRoutes.get("/me", tokenMiddleware, async (c) => {
  const userId = c.get("userId");
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user) {
    return c.json({ message: "User found", user }, 200);
    
  }
  return c.json({ message: "User not found" }, 404);
});
  

userRoutes.get("/all", tokenMiddleware, async (c) => {
 
  try {
    const users = await getAllUsers();
    return c.json(users, 200);
  } catch (error) {
    return c.json({ message: "Error fetching users" }, 500);
  }
  
});



userRoutes.get("/", tokenMiddleware, async (c) => {
  const users = await prisma.user.findMany();
  
  return c.json(users, 200);
});
