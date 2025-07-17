import connectToDB from "@/configs/db";
import UserModel from "@/models/User";

export async function PUT(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { id } = body;

    const user = await UserModel.findOne({ _id: id }).lean();

    await UserModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          role: user.role === "ADMIN" ? "USER" : "ADMIN",
        },
      }
    );

    return Response.json({ message: "user role changed successfully " });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
