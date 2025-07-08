import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verifyAccessToken } from "@/utils/auth-server";

export async function GET(req) {
  try {
    await connectToDB();
    const token = cookies().get("token");

    if (!token) {
      return Response.json(
        { message: "Not access !", data: null },
        { status: 401 }
      );
    }

    const payload = verifyAccessToken(token.value);

    if (!payload) {
      return Response.json(
        { data: null, message: "Invalid Token" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne(
      { email: payload.email },
      "-password -refreshToken -__v"
    );
    console.log("user backend => ", user);
    return Response.json(user);
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
