"use client";
import { useEffect, useState } from "react";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Stepper from "@/components/modules/stepper/Stepper";
import Table from "@/components/templates/cart/Table";
import styles from "@/styles/cart.module.css";
import Link from "next/link";
import { TbShoppingCartX } from "react-icons/tb";

const Page = () => {
  const [cartItem, setCartItem] = useState(null);

  useEffect(() => {
    const item = localStorage.getItem("cart");
    if (item) setCartItem(JSON.parse(item));
  }, []);

  return (
    <>
      <Navbar />
      <Stepper step="cart" />
      {cartItem ? (
        <main className={styles.cart} data-aos="fade-up">
          <Table />
        </main>
      ) : (
        <div className={styles.cart_empty} data-aos="fade-up">
          <TbShoppingCartX />
          <p>سبد خرید شما در حال حاضر خالی است.</p>
          <span>
            قبل از تسویه حساب، باید چند محصول را به سبد خرید خود اضافه کنید.
          </span>
          <span>در صفحه "فروشگاه"، محصولات جالب زیادی خواهید یافت.</span>
          <div>
            <Link href="/category">بازگشت به فروشگاه</Link>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Page;
