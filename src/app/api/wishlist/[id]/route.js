import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth-server";
import WishlistModel from "@/models/Wishlist";

export async function DELETE(res, { params }) {
  try {
    connectToDB();
    const user = await authUser();
    if (!user) {
      return Response.json(
        { messgae: "please loggin frist!" },
        { status: 401 }
      );
    }
    const productID = params.id;

    await WishlistModel.findOneAndDelete({
      user: user._id,
      product: productID,
    });

    return Response.json(
      {
        message: "product deleted successfully !",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: error }, { status: 500 });
  }
}
