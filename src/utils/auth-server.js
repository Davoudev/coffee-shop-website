// src/utils/auth-server.js
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";

const verifyAccessToken = (token) => {
  try {
    return verify(token, process.env.AccessTokenSecretKey);
  } catch {
    return false;
  }
};

const authUser = async () => {
  connectToDB();
  const token = cookies().get("token");
  if (!token) return null;

  const payload = verifyAccessToken(token.value);
  if (!payload) return null;

  return await UserModel.findOne({ email: payload.email });
};

const authAdmin = async () => {
  connectToDB();
  const token = cookies().get("token");
  if (!token) return null;
  let user = null;
  const payload = verifyAccessToken(token.value);
  if (!payload) return null;

  user = await UserModel.findOne({ email: payload.email });
  if (user.role === "ADMIN") {
    return user;
  } else {
    return null;
  }
};

export { verifyAccessToken, authUser, authAdmin };
