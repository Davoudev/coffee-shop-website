import { useState } from "react";
import styles from "./register.module.css";
import Sms from "./Sms";
import { showSwal } from "@/utils/helper";
import { validateEmail, validatePassword, validatePhone } from "@/utils/auth";

const Register = ({ showloginForm }) => {
  const [isRegisterWithPass, setIsRegisterWithPass] = useState(false);
  const [isRegisterWithOtp, setIsRegisterWithOtp] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hideOtpForm = () => setIsRegisterWithOtp(false);
  const signup = async () => {
    if (!name.trim()) {
      return showSwal("نام خود را وارد کنید", "error", "تلاش مجدد");
    }

    const isValidPhone = validatePhone(phone);

    if (!isValidPhone) {
      return showSwal("شماره تماس وارد شده معتبر نیست ", "error", "تلاش مجدد");
    }

    if (email) {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail)
        return showSwal(" ایمیل وارد شده معتبر نیست ", "error", "تلاش مجدد");
    }

    const isValidPassword = validatePassword(password);

    if (!isValidPassword) {
      return showSwal("پسورد وارد شده آسان است ", "error", "تلاش مجدد");
    }

    const user = { name, phone, email, password };
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res.status === 201) {
      showSwal("ثبت نام با موفقیت انچام شد", "success", "ورود به پنل کاربری");
    } else if (res.status === 422) {
      showSwal("شما قبلا حساب ساختید", "error", "برگشت");
    }
  };

  return (
    <>
      {!isRegisterWithOtp ? (
        <>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="نام"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className={styles.input}
              type="text"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="شماره موبایل  "
            />
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ایمیل (دلخواه)"
            />

            {isRegisterWithPass && (
              <input
                className={styles.input}
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="رمز عبور"
              />
            )}

            <p
              style={{ marginTop: "1rem" }}
              className={styles.btn}
              onClick={() => setIsRegisterWithOtp(true)}
            >
              ثبت نام با کد تایید
            </p>

            <button
              style={{ marginTop: ".7rem" }}
              onClick={() => {
                if (isRegisterWithPass) {
                  signup();
                } else {
                  setIsRegisterWithPass(true);
                }
              }}
              className={styles.btn}
            >
              ثبت نام با رمزعبور
            </button>
            <p onClick={showloginForm} className={styles.back_to_login}>
              برگشت به ورود
            </p>
          </div>
          <p className={styles.redirect_to_home}>لغو</p>
        </>
      ) : (
        <Sms hideOtpForm={hideOtpForm} />
      )}
    </>
  );
};

export default Register;
