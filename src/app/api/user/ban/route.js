import connectToDB from "@/configs/db";
import BanModel from "@/models/Ban";

export async function POST(req) {
  try {
    connectToDB();

    const body = await req.json();
    const { email, phone } = body;

    const existingBan = await BanModel.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingBan) {
      return Response.json(
        { message: "User is already banned" },
        { status: 400 }
      );
    }

    await BanModel.create({ email, phone });

    return Response.json({ message: "User banned successfully" });
  } catch (err) {
    return Response.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
