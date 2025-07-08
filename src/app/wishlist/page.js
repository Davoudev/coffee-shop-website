const { default: connectToDB } = require("@/configs/db");
import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Navbar from "@/components/modules/navbar/Navbar";
import WishModel from "@/models/Wishlist";
import Product from "@/components/modules/product/Product";
import styles from "@/styles/wishlist.module.css";

import React from "react";
import { FaRegHeart } from "react-icons/fa";
import { authUser } from "@/utils/auth-server";
import Link from "next/link";
import Footer from "@/components/modules/footer/Footer";

const page = async () => {
  let wishes = [];
  connectToDB();
  const user = await authUser();
  if (user) {
    wishes = await WishModel.find({ user: user._id })
      ?.populate("product", "name price  score")
      .lean();
  }

  return (
    <>
      <Navbar />
      <Breadcrumb route={"علاقه مندی ها"} />
      <main className={styles.container} data-aos="fade-up">
        <p className={styles.title}>محصولات مورد علاقه شما</p>
        <section>
          {wishes.length > 0 &&
            wishes.map((wish) => <Product key={wish._id} {...wish.product} />)}
        </section>
      </main>

      {wishes.length === 0 && (
        <div class={styles.wishlist_empty} data-aos="fade-up">
          <FaRegHeart />
          <p>محصولی یافت نشد</p>
          <span>شما هنوز هیچ محصولی در لیست علاقه مندی های خود ندارید.</span>
          <span>در صفحه "فروشگاه" محصولات جالب زیادی پیدا خواهید کرد.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default page;
