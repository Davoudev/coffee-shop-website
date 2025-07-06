import connectToDB from "@/configs/db";
import mongoose from "mongoose";
import WishlistModel from "@/models/Wishlist";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();

    const body = await req.json();
    const { user, product } = body;

    // validation

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId(product)
    ) {
      return Response.json(
        { message: "Invalid user or product ID format" },
        { status: 400 }
      );
    }

    //  check for exsiting

    const exsitingProduct = await ProductModel.findById(product);
    if (!exsitingProduct) {
      return Response.json({ message: "product not found !" }, { status: 404 });
    }
    const wish = await WishlistModel.findOne({ user, product });

    if (!wish) {
      await WishlistModel.create({ user, product });
    }

    return Response.json(
      { message: "Product added to Wishlist successfully" },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        message: `Error creating product: ${err.message}`,
      },
      { status: 500 }
    );
  }
}
