import type { User } from "@prisma/client"

export type GetUsersResult = {
  users: Array<User>; 
};

export enum GetUsersError {
  BAD_REQUEST,
};



export type GetMeResult = {
  user: User;
};

export enum GetMeError {
  BAD_REQUEST,
}