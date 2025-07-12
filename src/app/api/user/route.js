import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils/auth-server";

export async function POST(req) {
  try {
    connectToDB();
    const user = await authUser();
    const body = await req.json();
    const { name, email, phone } = body;

    // validation

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User Updated successfully :)" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
