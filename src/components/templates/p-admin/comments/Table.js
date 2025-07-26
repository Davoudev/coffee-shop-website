"use client";
import React from "react";
import styles from "./table.module.css";
import { showSwal } from "@/utils/helper";
import swal from "sweetalert";
import { useRouter } from "next/navigation";

export default function DataTable({ comments, title }) {
  const router = useRouter();

  const showCommentBody = (body) => {
    showSwal(body, undefined, "خوندم");
  };
  const acceptCommet = async (commentID) => {
    const res = await fetch("/api/comments/accept", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر با موفقیت تایید شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        router.refresh();
      });
    }
  };

  const rejectCommet = async (commentID) => {
    const res = await fetch("/api/comments/reject", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: commentID }),
    });

    if (res.status === 200) {
      swal({
        title: "کامنت مورد نظر با موفقیت تایید شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
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
              <th>کاربر</th>
              <th>ایمیل </th>
              <th>امتیاز</th>
              <th>محصول</th>
              <th>تاریخ ثبت </th>
              <th>مشاهده</th>
              <th>ویرایش</th>
              <th>حذف</th>
              <th>تایید</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => (
              <tr
                key={comment._id}
                className={comment.isAccept ? styles.accept : styles.reject}
              >
                <td>{index + 1}</td>
                <td>{comment.username}</td>
                <td>{comment.email}</td>
                <td>{comment.score}</td>
                <td>{comment.productID.name}</td>
                <td>{new Date(comment.date).toLocaleDateString("fa-IR")}</td>
                <td>
                  <button
                    className={`${styles.action_btn} ${styles.edit_btn}`}
                    onClick={() => showCommentBody(comment.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={`${styles.action_btn} ${styles.edit_btn}`}
                  >
                    ویرایش
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={`${styles.action_btn} ${styles.delete_btn}`}
                  >
                    حذف
                  </button>
                </td>
                <td>
                  {comment.isAccept ? (
                    <button
                      className={`${styles.action_btn} ${styles.edit_btn}`}
                      onClick={() => rejectCommet(comment._id)}
                    >
                      رد
                    </button>
                  ) : (
                    <button
                      className={`${styles.action_btn} ${styles.edit_btn}`}
                      onClick={() => acceptCommet(comment._id)}
                    >
                      تایید
                    </button>
                  )}
                </td>
                <td>
                  <button
                    type="button"
                    className={`${styles.action_btn} ${styles.delete_btn}`}
                  >
                    پاسخ
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className={`${styles.action_btn} ${styles.ban_btn}`}
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
