"use client";
import React, { useState } from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function DataTable({ users, title }) {
  const router = useRouter();
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedName(user.name);
  };

  const changeRole = async (userID) => {
    const res = await fetch("/api/user/role", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userID }),
    });
    if (res.status === 200) {
      swal({
        title: "نقش کاربر با موفقیت تغییر کرد ",
        icon: "success",
        buttons: "متوجه شدم !",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const removeUser = async (userID) => {
    swal({
      title: "آیا از حذف کاربر مطمئن هستید ؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch(`/api/user?id=${userID}`, {
          method: "DELETE",
        });

        if (res.status === 200) {
          swal({
            title: "کاربر با موفقیت حذف شد  /",
            icon: "success",
            buttons: "متوجه شدم !",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  const banUser = async (email, phone) => {
    swal({
      title: "آیا از بن کاربر مطمئن هستید ؟",
      icon: "warning",
      buttons: ["نه", "آره"],
    }).then(async (result) => {
      if (result) {
        const res = await fetch("/api/user/ban", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phone }),
        });

        if (res.status === 200) {
          swal({
            title: "کاربر با موفقیت بن شد",
            icon: "success",
            buttons: "متوجه شدم !",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

  const handleSaveClick = async (userId) => {
    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId, name: editedName }),
    });

    if (res.status === 200) {
      swal({
        title: "نام با موفقیت به‌روزرسانی شد",
        icon: "success",
        buttons: "باشه",
      }).then(() => {
        setEditingUserId(null);
        router.refresh();
      });
    }
  };
  return (
    <div>
      <div>
        <h1 className={styles.title}>
          <span>{title}</span>
        </h1>
      </div>
      <div className={styles.table_container}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>ویرایش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  {editingUserId === user._id ? (
                    <input
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      className={styles.input_edit}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>{user.email ? user.email : "ایمیل یافت نشد"}</td>
                <td>{user.role === "USER" ? "کاربر عادی" : "مدیر"}</td>
                <td>
                  {editingUserId === user._id ? (
                    <button
                      className={`${styles.action_btn} ${styles.save_btn}`}
                      onClick={() => handleSaveClick(user._id)}
                    >
                      ذخیره
                    </button>
                  ) : (
                    <button
                      className={`${styles.action_btn} ${styles.edit_btn}`}
                      onClick={() => handleEditClick(user)}
                    >
                      ویرایش
                    </button>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={`${styles.action_btn} ${styles.edit_btn}`}
                    onClick={() => changeRole(user._id)}
                  >
                    تغییر نقش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={`${styles.action_btn} ${styles.delete_btn}`}
                    onClick={() => removeUser(user._id)}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={`${styles.action_btn} ${styles.ban_btn}`}
                    onClick={() => banUser(user.email, user.phone)}
                  >
                    بن
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
