"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/p-user/sendTicket.module.css";
import Link from "next/link";
import { IoIosSend } from "react-icons/io";

const SendTicket = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentID, setDepartmentID] = useState(-1);
  const [subDepartments, setSubDepartments] = useState([]);
  const [subDepartmentID, setSubDepartmentID] = useState(-1);
  const [priority, setPriority] = useState(1);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    const getDepartments = async () => {
      const res = await fetch("/api/departments");
      const data = await res.json();
      setDepartments(data);
    };
    getDepartments();
  }, []);

  useEffect(() => {
    const getSubDepartments = async () => {
      if (departmentID === -1) return;
      const res = await fetch(`/api/departments/sub/${departmentID}`);
      if (res.status === 200) {
        const data = await res.json();
        setSubDepartments(data);
      }
    };
    getSubDepartments();
  }, [departmentID]);

  const sendTicket = async () => {
    if (!title || !body || departmentID === -1 || subDepartmentID === -1) {
      alert("لطفاً همه فیلدها را کامل کنید.");
      return;
    }

    const ticket = {
      title,
      body,
      department: departmentID,
      subDepartment: subDepartmentID,
      priority: Number(priority),
    };

    const res = await fetch("/api/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    });

    if (res.status === 201) {
      swal({
        title: "تیکت شما با موفقیت ثبت شد",
        icon: "success",
        buttons: "مشاهده تیکت‌ها",
      }).then(() => {
        location.replace("/p-user/tickets");
      });
    } else {
      alert("ارسال تیکت با خطا مواجه شد.");
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        <span>ارسال تیکت جدید</span>
        <Link href="/p-user/tickets">همه تیکت‌ها</Link>
      </h1>

      <div className={styles.content}>
        <div className={styles.group}>
          <label>دپارتمان را انتخاب کنید:</label>
          <select
            value={departmentID}
            onChange={(e) => setDepartmentID(e.target.value)}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            {departments.map((d) => (
              <option key={d._id} value={d._id}>
                {d.title}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label>نوع تیکت را انتخاب کنید:</label>
          <select
            value={subDepartmentID}
            onChange={(e) => setSubDepartmentID(e.target.value)}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            {subDepartments.map((sd) => (
              <option key={sd._id} value={sd._id}>
                {sd.title}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.group}>
          <label>عنوان تیکت را وارد کنید:</label>
          <input
            type="text"
            placeholder="عنوان..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.group}>
          <label>سطح اولویت تیکت را انتخاب کنید:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="3">کم</option>
            <option value="2">متوسط</option>
            <option value="1">بالا</option>
          </select>
        </div>
      </div>

      <div className={styles.group}>
        <label>محتوای تیکت را وارد نمایید:</label>
        <textarea
          rows={10}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
      </div>

      <div className={styles.uploader}>
        <span>حداکثر اندازه: 6 مگابایت</span>
        <span>فرمت‌های مجاز: jpg, png, jpeg, rar, zip</span>
        <input type="file" />
      </div>

      <button className={styles.btn} onClick={sendTicket}>
        <IoIosSend />
        ارسال تیکت
      </button>
    </main>
  );
};

export default SendTicket;
