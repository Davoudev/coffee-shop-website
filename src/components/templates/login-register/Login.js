"use client";
import React, { useState, useEffect } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { loginAction } from "@/actions/login";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const router = useRouter();

  const [state, formAction] = useFormState(loginAction, null);

  useEffect(() => {
    if (!state) return;

    if (state.success) {
      showSwal(
        "شما با موفقیت لاگین شدین!",
        "success",
        "ورود به پنل کاربری"
      ).then(() => {
        router.push("/p-user");
      });
    } else if (state.error) {
      showSwal(state.error, "error", "تلاش مجدد");
    }
  }, [state, router]);

  const hideOtpForm = () => setIsLoginWithOtp(false);

  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <form action={formAction}>
            <div className={styles.form}>
              <input
                className={styles.input}
                name="identifier"
                type="text"
                value={phoneOrEmail}
                onChange={(event) => setPhoneOrEmail(event.target.value)}
                placeholder="ایمیل/شماره موبایل"
              />
              <input
                className={styles.input}
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="رمز عبور"
              />
              <div className={styles.checkbox}>
                <input type="checkbox" name="" id="" />
                <p>مرا به یاد داشته باش</p>
              </div>
              <button className={styles.btn}>ورود</button>
              <Link href={"/forget-password"} className={styles.forgot_pass}>
                رمز عبور را فراموش کرده اید؟
              </Link>
              <button
                type="button"
                onClick={() => setIsLoginWithOtp(true)}
                className={styles.btn}
              >
                ورود با کد یکبار مصرف
              </button>
              <span>ایا حساب کاربری ندارید؟</span>
              <button
                type="button"
                onClick={showRegisterForm}
                className={styles.btn_light}
              >
                ثبت نام
              </button>
            </div>
          </form>
          <Link href={"/"} className={styles.redirect_to_home}>
            لغو
          </Link>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Login;
