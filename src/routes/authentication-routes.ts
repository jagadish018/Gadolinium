import { Hono } from "hono";
import {
  SignUpWithUsernameAndPasswordError,
  LoginWithUsernameAndPasswordError,
} from "../controllers/authentication/authentication-types";
import {
  signUpWithUsernameAndPassword,
  logInWithUsernameAndPassword,
} from "../controllers/authentication/authentication-controller";
import { prisma } from "../extras/prisma";

export const authenticationRoutes = new Hono();

authenticationRoutes.post("/sign-up", async (c) => {
  try {
    const { username, password } = await c.req.json();
    const user = await signUpWithUsernameAndPassword({
      username,
      password,
    });
    return c.json(
      {
        data: user,
      },
      201
    );
  } catch (error) {
    if (error === SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME) {
      return c.json(
        {
          error: "Incorrect username or password",
        },
        401
      );
    }

    if (error === SignUpWithUsernameAndPasswordError.UNKNOWN) {
      return c.json(
        {
          error: "Unknown error",
        },
        500
      );
    }
  }
});

authenticationRoutes.post("/log-in", async (c) => {
  try {
    const { username, password } = await c.req.json();
    const result = await logInWithUsernameAndPassword({
      username,
      password,
    });
    return c.json(
      {
        data: result,
      },
      200
    );
  } catch (error) {
    if (
      error === LoginWithUsernameAndPasswordError.INCORRECT_USERNAME_OR_PASSWORD
    ) {
      return c.json(
        {
          error: "Invalid credentials",
        },
        401
      );
    }

    if (error === LoginWithUsernameAndPasswordError.UNKNOWN) {
      return c.json(
        {
          error: "Unknown error",
        },
        500
      );
    }
  }
});
