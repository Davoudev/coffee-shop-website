import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword,
} from "@/utils/auth-client";

export async function POST(req) {
  const body = await req.json();

  try {
    connectToDB();
    const { email, password } = body;

    // validation Email and Password
    const isValidEmail = validateEmail(email);
    const isValidPassword = validatePassword(password);

    if (!isValidEmail || !isValidPassword) {
      return Response.json(
        { message: "Email or Password is Wrong" },
        { status: 419 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json({ messgae: "User not found !" }, { status: 422 });
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPasswordWithHash) {
      return Response.json(
        { message: "Email or password is not correct" },
        { status: 401 }
      );
    }
    const accessToken = generateAccessToken({ email });
    const refreshToken = generateRefreshToken({ email });

    await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          refreshToken,
        },
      }
    );
    const headers = new Headers();
    headers.append("Set-Cookie", `token=${accessToken}; path=/ ;httpOnly=true`);
    headers.append(
      "Set-Cookie",
      `refresh-token=${refreshToken}; path=/ ;httpOnly=true`
    );

    return Response.json(
      { message: "User Logged in successfully :))" },
      {
        status: 200,
        headers,
      }
    );
  } catch (err) {
    console.log("err->", err);
    return Response.json({ message: err }, { status: 500 });
  }
}
