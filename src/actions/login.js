"use server";
import { cookies } from "next/headers";
import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
  validateEmail,
  validatePassword,
  verifyPassword,
  validatePhone,
} from "@/utils/auth-client";

export const loginAction = async (prevState, formData) => {
  try {
    connectToDB();
    const identifier = formData.get("identifier");
    const password = formData.get("password");

    if (!identifier) {
      return { error: "لطفا شماره تماس یا ایمیل را وارد کنید" };
    }

    const isValidEmail = validateEmail(identifier);
    const isValidPhone = validatePhone(identifier);
    if (!isValidEmail && !isValidPhone) {
      return { error: "لطفا شماره تماس یا ایمیل را درست وارد کنید" };
    }

    if (!password) {
      return { error: "لطفا پسورد رو وارد کنید" };
    }

    const isValidPasswordStrength = validatePassword(password);
    if (!isValidPasswordStrength) {
      return { error: "پسورد وارد شده به اندازه کافی قوی نیست" };
    }

    const query = isValidEmail ? { email: identifier } : { phone: identifier };
    const user = await UserModel.findOne(query);

    if (!user) {
      return { error: "کاربری با این اطلاعات یافت نشد" };
    }

    const isCorrectPasswordWithHash = await verifyPassword(
      password,
      user.password
    );

    if (!isCorrectPasswordWithHash) {
      return { error: "ایمیل یا پسورد وارد شده صحیح نیست" };
    }

    const accessToken = generateAccessToken({ email: user.email });
    const refreshToken = generateRefreshToken({ email: user.email });

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          refreshToken,
        },
      }
    );

    const cookieStore = cookies();
    cookieStore.set("token", accessToken, { path: "/", httpOnly: true });
    cookieStore.set("refresh-token", refreshToken, {
      path: "/",
      httpOnly: true,
    });

    return { success: true };
  } catch (err) {
    console.log("err->", err);
    return { error: "خطایی در سرور رخ داده است" };
  }
};
