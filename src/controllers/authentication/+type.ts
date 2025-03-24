import type {User} from "@prisma/client";

export enum SignUpWithUsernameAndPasswordError {
  CONFLICTING_USERNAME = "CONFILCTING_USERNAME",
  UNKNOWN = "UNKNOWN",
}

export type SignUpWithUsernameAndPasswordResponseResult = {
  token: string;
  user: User;
};
