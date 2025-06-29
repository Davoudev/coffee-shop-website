import { generateAccessToken, hashPassword } from "@/utils/auth";
import connectToDB from "../../../../../configs/db";
import UserModel from "@/models/User";
import { roles } from "@/utils/constants";

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const { name, phone, email, password } = body;

  //   validation in back-end (YOU)

  if (!name || !phone || !email) {
    return Response.json(
      { message: "missing required fillds" },
      { status: 400 }
    );
  }

  const queryConditions = [];
  if (name) queryConditions.push({ name });
  if (phone) queryConditions.push({ phone });
  if (email) queryConditions.push({ email });

  const isUserExist = await UserModel.findOne({ $or: queryConditions });

  if (isUserExist) {
    return Response.json(
      { message: "The username or email or phone already exists!" },
      { status: 422 }
    );
  }

  const hashedPassword = hashPassword(password);
  const users = await UserModel.find({});

  try {
    const newUser = await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });

    const accessToken = generateAccessToken({ name });

    return Response.json(
      { message: "User created successfully!" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${accessToken};  path/; httpOnly=true`,
        },
      }
    );
  } catch (err) {
    console.error("Error during user creation:", err);
    return Response.json({ message: "Error creating user." }, { status: 500 });
  }
}
