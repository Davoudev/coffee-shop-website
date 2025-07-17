import UserModel from "@/models/User"; // مدل یوزر شما
import connectToDB from "@/configs/db";

export async function PUT(req) {
  try {
    connectToDB();

    const { id, name } = await req.json();

    if (!id || !name) {
      return Response.json({ message: "اطلاعات نامعتبر است" }, { status: 400 });
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return Response.json({ message: "کاربر یافت نشد" }, { status: 404 });
    }

    user.name = name;
    await user.save();

    return Response.json(
      { message: "نام با موفقیت به‌روزرسانی شد" },
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در آپدیت کاربر:", err);
    return Response.json({ message: "خطایی رخ داد" }, { status: 500 });
  }
}
