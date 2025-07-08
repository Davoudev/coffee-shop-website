"use client";
import { showSwal } from "@/utils/helper";
import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";

const AddToWishList = ({ productID }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const authUser = async () => {
      const res = await fetch("/api/auth/me");
      if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setUser({ ...data });
      }
    };

    authUser();
  }, []);

  const addToWishList = async (event) => {
    event.preventDefault();
    if (!user?._id) {
      return showSwal(
        "برای اضافه کردن به علاقه مندی ها لطفا لاگین کنید",
        "error",
        "فهمیدم"
      );
    }

    const wish = { user: user._id, product: productID };
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wish),
    });
    console.log("res =>", res);
    if (res.status === 201) {
      showSwal("محصول مورئ نظر به علاقه مندی ها اضافه شد", "success", "فهمیدم");
    }
  };
  return (
    <div onClick={addToWishList}>
      <CiHeart />
      <a href="/">افزودن به علاقه مندی ها</a>
    </div>
  );
};

export default AddToWishList;
