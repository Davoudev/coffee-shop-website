"use client";
import React from "react";
import styles from "./table.module.css";
import { useRouter } from "next/navigation";

export default function DataTable({ products, title }) {
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
              <th>نام</th>
              <th>قیمت </th>
              <th>امتیاز</th>
              <th>مشاهده جرئیات</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.score}</td>
                <td>
                  <button
                    className={`${styles.action_btn} ${styles.edit_btn}`}
                    onClick={() => showCommentBody(product.body)}
                  >
                    جرئیات
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
