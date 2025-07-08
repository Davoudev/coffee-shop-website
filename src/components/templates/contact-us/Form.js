"use client";
import { useState } from "react";
import styles from "./form.module.css";
import { validateEmail, validatePhone } from "@/utils/auth-client";
import { showSwal } from "@/utils/helper";

const Form = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const submitMessage = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim() || !phone.trim()) {
      return showSwal("اطلاعات خود را کامل وارد کنید ", "error", "تلاش مجدد");
    }

    const isValidPhone = validatePhone(phone);

    if (!isValidPhone) {
      return showSwal("شماره تماس وارد شده معتبر نیست ", "error", "تلاش مجدد");
    }
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      return showSwal(" ایمیل وارد شده معتبر نیست ", "error", "تلاش مجدد");
    }

    const contact = {
      name,
      email,
      phone,
      company,
      message,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contact),
    });

    if (res.status === 201) {
      setEmail("");
      setName("");
      setCompany("");
      setPhone("");
      setMessage("");
      showSwal("پیغام شما با موفیت ثبت شد ", "success", "فهمیدم");
    }
  };

  return (
    <form className={styles.form}>
      <span>فرم تماس با ما</span>
      <p>برای تماس با ما می توانید فرم زیر را تکمیل کنید</p>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>نام و نام خانوادگی</label>
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>آدرس ایمیل</label>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.groups}>
        <div className={styles.group}>
          <label>شماره تماس</label>
          <input
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </div>
        <div className={styles.group}>
          <label>نام شرکت</label>
          <input
            type="text"
            value={company}
            onChange={(event) => setCompany(event.target.value)}
          />
        </div>
      </div>
      <div className={styles.group}>
        <label>درخواست شما</label>
        <textarea
          name=""
          id=""
          cols="30"
          rows="3"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        ></textarea>
      </div>
      <button onClick={submitMessage}>ارسال</button>
    </form>
  );
};

export default Form;
