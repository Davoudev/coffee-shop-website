"use client";
import React from "react";
import styles from "./table.module.css";
import swal from "sweetalert";
import { showSwal } from "@/utils/helper";

export default function DataTable({ tickets, title }) {
  const showTicketBody = (body) => {
    showSwal(body, undefined, "خوندم");
  };

  const answerToTicket = async (ticket) => {
    swal({
      title: "لطفا پاسح مورد نظر را وارد کنید : ",
      content: "input",
      buttons: "ثبت پاسخ",
    }).then(async (answerText) => {
      if (answerText) {
        const answer = {
          ...ticket,
          body: answerText,
          ticketID: ticket._id,
        };

        const res = await fetch("/api/tickets/answer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answer),
        });

        if (res.status === 201) {
          swal({
            title: "پاسخ مورد نظر ثبت شد ",
            icon: "success",
            buttons: "فهمیدم",
          });
        }
      }
    });
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
              <th>عنوان </th>
              <th>دپارتمان</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={ticket._id}>
                <td>{index + 1}</td>
                <td>{ticket.user.name}</td>
                <td>{ticket.title}</td>
                <td>{ticket.department.title}</td>
                <td>
                  <button
                    className={`${styles.action_btn} ${styles.edit_btn}`}
                    onClick={() => showTicketBody(ticket.body)}
                  >
                    مشاهده
                  </button>
                </td>
                <td>
                  <button
                    className={`${styles.action_btn} ${styles.delete_btn}`}
                    onClick={() => answerToTicket(ticket)}
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
