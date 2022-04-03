import { request } from "@/utils";
import type { User } from "@/model";
import type { Response } from "@/@types/global";

export const login = (
  name: string,
  password: string
): Promise<Response<User>> =>
  request.post("/api/user/login", { name, password });
export const register = (
  name: string,
  password: string
): Promise<Response<User>> =>
  request.post("/api/user/register", { name, password });
export const githubAuth = () => request.post("/api/user/github-auth");
export const logout = () => request.post("/api/user/logout");

export default {
  login,
  register,
  githubAuth,
  logout,
};
