import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth-server";
import TicketModel from "@/models/Ticket";

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = await req.json();
    const user = await authUser();
    const { department, subDepartment, title, body, priority } = reqBody;

    await TicketModel.create({
      department,
      subDepartment,
      title,
      body,
      priority,
      user: user._id,
    });

    return Response.json({ message: "Ticket saved " }, { status: 201 });
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
