import { authUser } from "@/utils/auth-server";
import TicketModel from "@/models/Ticket";
import connectToDB from "@/configs/db";

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
    console.error("API Error in /api/tickets:", err); // بهتره همیشه لاگ کنی
    return Response.json({ message: err.message }, { status: 500 });
  }
}
