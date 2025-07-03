import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
export async function POST(req) {
  try {
    connectToDB();
    const body = await req.json();
    const {
      name,
      price,
      shortDescription,
      longDescription,
      Weight,
      suitableFor,
      smell,
      tags,
    } = body;

    const product = await ProductModel.create({
      name,
      price,
      shortDescription,
      longDescription,
      Weight,
      suitableFor,
      smell,
      tags,
    });

    return Response.json(
      {
        message: "user craeted successfully :))",
        headers: {
          "Content-Type": "application/json",
        },
        data: product,
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        message: `Error creating product:${err.message}`,
      },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const products = await ProductModel.find({}, "-__v").populate("comments");
  return Response.json(products);
}
