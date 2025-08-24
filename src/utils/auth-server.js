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

export const authUser = async () => {
  connectToDB();
  const token = cookies().get("token")?.value;

  // check refresh Token
  if (!token) {
    return await tryRefreshToken();
  }
  try {
    // validate access Token
    const payload = verify(token, process.env.AccessTokenSecretKey);
    if (!payload) {
      return await tryRefreshToken();
    }

    // verfy access token
    return await UserModel.findOne({ email: payload.email });
  } catch (err) {
    return await tryRefreshToken();
  }
};

// helper func for refresh token
const tryRefreshToken = async () => {
  const refreshToken = cookies().get("refresh-token")?.value;

  if (!refreshToken) {
    return null;
  }

  try {
    // verfy refresh token system
    const payload = verify(refreshToken, process.env.RefreshTokenSecretKey);
    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return null;
    }

    // create new access token
    const newAccessToken = generateAccessToken({ email: user.email });

    // set new access token
    cookies().set("token", newAccessToken, {
      path: "/",
      httpOnly: true,
    });

    return user;
  } catch (err) {
    return null;
  }
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
