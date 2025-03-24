
import {SignUpWithUsernameAndPasswordError,type SignUpWithUsernameAndPasswordResponseResult,} from "./+type";
import { prisma } from "../../extras/prisma";
import {sign , type JwtPayload} from "jsonwebtoken";
import { jwtSecretKey } from "../../environment";
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

    const user = await prisma.user.create({
      data: {
        username: parameters.username,
        password: parameters.password,
      },
    });
      
      const JwtPayload: JwtPayload = {
        iss: "atchutha57@gmail.com",
        sub: user.id,
      };
      const token = sign(JwtPayload, jwtSecretKey, {
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
