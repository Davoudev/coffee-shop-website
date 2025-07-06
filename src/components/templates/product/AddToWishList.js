"use client";
import React from "react";
import { CiHeart } from "react-icons/ci";

const AddToWishList = async () => {
  const addToWishList = async () => {
    console.log("add to wish list handler ");
  };
  return (
    <div onClick={addToWishList}>
      <CiHeart />
      <a href="/">افزودن به علاقه مندی ها</a>
    </div>
  );
};

export default AddToWishList;
