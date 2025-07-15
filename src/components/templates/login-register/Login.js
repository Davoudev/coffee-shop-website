import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import Sms from "./Sms";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "@/utils/auth-client";
import { showSwal } from "@/utils/helper";
import { useRouter } from "next/navigation";

const Login = ({ showRegisterForm }) => {
  const [isLoginWithOtp, setIsLoginWithOtp] = useState(false);
  const [password, setPassword] = useState("");
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const router = useRouter();

  const hideOtpForm = () => setIsLoginWithOtp(false);
  const logginWithpassword = async () => {
    if (!phoneOrEmail) {
      return showSwal(
        "لطفا شماره تماس  یا ایمیل را وارد کنید",
        "error",
        " چشم"
      );
    }

    const isPhone = validatePhone(phoneOrEmail);
    const isValidEmail = validateEmail(phoneOrEmail);
    if (!isValidEmail && !isPhone) {
      return showSwal(
        "لطفا شماره تماس  یا ایمیل را درست وارد کنید",
        "error",
        "تلاش مجدد"
      );
    }

    if (!password) {
      return showSwal("لطفا پسورد رو وارد کنید ", "error", "چشم");
    }

    const isValidPassword = validatePassword(password);
    if (!isValidPassword) {
      return showSwal(
        "پسورد وارد شده به انداره کافی قوی نیست",
        "error",
        "نلاش مجدد"
      );
    }

    // send request
    const user = { email: phoneOrEmail, password };

    const res = await fetch("/api/auth/signin/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.status === 200) {
      swal({
        title: "شما با موفقیت لاگین شدین!",
        icon: "success",
        buttons: "ورود به پنل کاربردی",
      }).then(() => {
        router.replace("/p-user");
      });
    } else if (res.status === 422 || res.status === 401) {
      showSwal("کاربری با این اطلاعات یافت نشد", "error", "تلاش");
    } else if (res.status == 419) {
      showSwal("ایمیل یا پسورد وارد شده صحیح نیست ", "error", "تلاش مجدد");
    }
  };
  return (
    <>
      {!isLoginWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              value={phoneOrEmail}
              onChange={(event) => setPhoneOrEmail(event.target.value)}
              placeholder="ایمیل/شماره موبایل"
            />
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="رمز عبور"
            />
            <div className={styles.checkbox}>
              <input type="checkbox" name="" id="" />
              <p>مرا به یاد داشته باش</p>
            </div>
            <button className={styles.btn} onClick={logginWithpassword}>
              ورود
            </button>
            <Link href={"/forget-password"} className={styles.forgot_pass}>
              رمز عبور را فراموش کرده اید؟
            </Link>
            <button
              onClick={() => setIsLoginWithOtp(true)}
              className={styles.btn}
            >
              ورود با کد یکبار مصرف
            </button>
            <span>ایا حساب کاربری ندارید؟</span>
            <button onClick={showRegisterForm} className={styles.btn_light}>
              ثبت نام
            </button>
          </div>
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
