import { Hono } from "hono";

import { signUpWithUsernameAndPasswordResponseResult } from "../controllers/authentication";

export const hono = new Hono();


hono.post("/authentication/sign-up", async (c) => {
    try {
        const { username, password } = await c.req.json();
        const user = await signUpWithUsernameAndPasswordResponseResult({
            username,
            password,
        })
        return c.json({
            data:user
        },201);
    }
    catch (error) {
        if (error === "CONFILCTING_USERNAME") {
          return c.json(
            {
              error: "Username already exists",
            },
            409
          );
        }

        if (error === "UNKNOWN") {
          return c.json(
            {
              error: "An unknown error occurred",
            },
            500
          );
        }
        

    }
});


hono.get("/health", (c) => {
  return c.json(
    {
      status: "ok",
    },
    200
  );
});

