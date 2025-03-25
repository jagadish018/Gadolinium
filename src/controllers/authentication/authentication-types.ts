import type { User } from "@prisma/client";

export enum SignUpWithUsernameAndPasswordError {
  CONFLICTING_USERNAME = "CONFILCTING_USERNAME",
  UNKNOWN = "UNKNOWN",
}

export type SignUpWithUsernameAndPasswordResponseResult = {
  token: string;
  user: User;
};

export enum LoginWithUsernameAndPasswordError {
  INCORRECT_USERNAME_OR_PASSWORD = "INCORRECT_USERNAME_OR_PASSWORD",
  UNKNOWN = "UNKNOWN",
}
export type LoginWithUsernameAndPasswordResponseResult = {
  token: string;
  user: User;
};
