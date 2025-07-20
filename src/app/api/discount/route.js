import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth-server";
import DiscountModel from "@/models/Discount";

export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const user = await authUser();

    const { code, percent, maxUse, uses, productID } = body;

    await DiscountModel.create({
      code,
      percent,
      maxUse,
      uses,
      product: productID,
      user: user._id,
    });

    return Response.json(
      { message: "Discount code craeted successflly :))" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}
