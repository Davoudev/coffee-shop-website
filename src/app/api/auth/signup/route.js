import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, hashPassword } from "@/utils/auth-client";
import { roles } from "@/utils/constants";

export async function POST(req) {
  await connectToDB();
  const body = await req.json();
  const { name, phone, email, password } = body;

  // 1. بررسی فیلدهای اجباری
  // if (!name || !phone || !password) {
  //   return Response.json(
  //     { message: "Missing required fields" },
  //     { status: 400 }
  //   );
  // }

  // // 2. اعتبارسنجی نام (حداقل 3 کاراکتر)
  // if (typeof name !== "string" || name.trim().length < 3) {
  //   return Response.json(
  //     { message: "Name must be at least 3 characters long." },
  //     { status: 400 }
  //   );
  // }

  // // 3. اعتبارسنجی ایمیل اگر وجود داشت
  // if (email) {
  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailRegex.test(email)) {
  //     return Response.json(
  //       { message: "Invalid email format." },
  //       { status: 400 }
  //     );
  //   }
  // }

  // // 4. اعتبارسنجی شماره تلفن (مثلاً فقط اعداد و حداقل 10 رقم)
  // const phoneRegex = /^\d{10,15}$/; // بین 10 تا 15 رقم
  // if (!phoneRegex.test(phone)) {
  //   return Response.json(
  //     {
  //       message:
  //         "Phone must be between 10 to 15 digits and contain only numbers.",
  //     },
  //     { status: 400 }
  //   );
  // }

  // // 5. اعتبارسنجی پسورد (حداقل 8 کاراکتر، حداقل یک عدد و یک حرف)
  // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  // if (!passwordRegex.test(password)) {
  //   return Response.json(
  //     {
  //       message:
  //         "Password must be minimum 8 characters, at least one letter and one number.",
  //     },
  //     { status: 400 }
  //   );
  // }

  // const queryConditions = [];
  // if (name) queryConditions.push({ name });
  // if (phone) queryConditions.push({ phone });
  // if (email) queryConditions.push({ email });

  // const isUserExist = await UserModel.findOne({ $or: queryConditions });

  // if (isUserExist) {
  //   return Response.json(
  //     { message: "The username or email or phone already exists!" },
  //     { status: 422 }
  //   );
  // }

  const hashedPassword = await hashPassword(password);
  const users = await UserModel.find({});

  try {
    await UserModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: users.length > 0 ? roles.USER : roles.ADMIN,
    });

    const accessToken = generateAccessToken({ name });

    return Response.json(
      { message: "User created successfully!" },
      {
        status: 201,
        headers: {
          "Set-Cookie": `token=${accessToken}; path=/; httpOnly=true`,
        },
      }
    );
  } catch (err) {
    console.error("Error during user creation:", err);
    return Response.json({ message: "Error creating user." }, { status: 500 });
  }
}
