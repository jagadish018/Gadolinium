
import {SignUpWithUsernameAndPasswordError,type SignUpWithUsernameAndPasswordResponseResult,} from "./+type";
import { prisma } from "../../extras/prisma";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../../../environment";
import { createHash } from "crypto";

export const signUpWithUsernameAndPasswordResponseResult = async (parameters: {
  username: string;
  password: string;
}): Promise<SignUpWithUsernameAndPasswordResponseResult> => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        username: parameters.username,
      },
    });

    if (existingUser) {
      throw SignUpWithUsernameAndPasswordError.CONFLICTING_USERNAME;
    }

    const hashedPassword = createHash("sha256")
      .update(parameters.password)
      .digest("hex"); // This is a simple way to hash a password. Do not use this in production.

    const user = await prisma.user.create({
      data: {
        username: parameters.username,
        password: hashedPassword,
      },
    });
      
      const JwtPayload: jwt.JwtPayload = {
        iss: "Jagan.4056@gmail.com",
          sub: user.id,
        username: user.username,
      };
      const token = jwt.sign(JwtPayload, jwtSecretKey, {
        expiresIn: "30d",
      });
        const result: SignUpWithUsernameAndPasswordResponseResult = {
            user,
            token,
      };
      return result;
     
  } catch (e) {
    console.error(e);
    throw SignUpWithUsernameAndPasswordError.UNKNOWN;
  }
};
