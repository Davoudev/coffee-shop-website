import connectToDB from "@/configs/db";
import CommentModel from "@/models/Comment";
import ProductModel from "@/models/Product";

export async function POST(req) {
  try {
    connectToDB();
    const reqBody = req.json();
    const { username, body, email, score, productID } = body;

    // validation
    if (!username || typeof username !== "string" || username.length < 2) {
      return Response.json(
        { message: "متن نظر باید حداقل ۵ حرف داشته باشد." },
        { status: 400 }
      );
    }

    const validateEmail = validateEmail(email);
    if (!email || typeof email !== "string" || !validateEmail) {
      return Response.json({ message: "ایمیل نامعتبر است." }, { status: 400 });
    }

    if (
      score === undefined ||
      typeof score !== "number" ||
      score < 1 ||
      score > 5
    ) {
      return Response.json(
        { message: "امتیاز باید عددی بین ۱ تا ۵ باشد." },
        { status: 400 }
      );
    }

    if (!productID || typeof productID !== "string") {
      return Response.json(
        { message: "شناسه محصول معتبر نیست." },
        { status: 400 }
      );
    }

    //  create comment
    const comment = await CommentModel.create({
      username,
      body,
      email,
      score,
      productID,
    });

    const updatedProduct = await ProductModel.findOneAndUpdate(
      {
        _id: productID,
      },
      {
        $push: {
          comments: comment._id,
        },
      }
    );

    return Response.json(
      {
        message: "Comment created successfully :))",
        data: comment,
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

export async function GET() {
  const comments = await CommentModel.find({}, "-__v");
  return Response.json(comments);
}
