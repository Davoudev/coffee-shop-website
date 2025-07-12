import connectToDB from "@/configs/db";
import SubDepartmentModel from "@/models/SubDepartment";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const { title, department } = body;

    //   validation

    await SubDepartmentModel.create({ title, department });

    return Response.json(
      { message: "subDepartment created successfully" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
