"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "./Navbar.module.css";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { FaShoppingCart, FaRegHeart, FaBars } from "react-icons/fa"; // اضافه کردن آیکون همبرگر

function Navbar({ isLogin }) {
  const [fixTop, setFixTop] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // state برای منوی موبایل
  const navbarRef = useRef(null); // ref برای navbar

  useEffect(() => {
    const fixNavbarToTop = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 105) {
        setFixTop(true);
      } else {
        setFixTop(false);
      }
    };

    window.addEventListener("scroll", fixNavbarToTop);

    return () => window.removeEventListener("scroll", fixNavbarToTop);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      ref={navbarRef}
      className={`${fixTop ? styles.navbar_fixed : styles.navbar} ${
        isMenuOpen ? styles.menu_open : ""
      }`}
    >
      <main>
        <div className={styles.logo}>
          <Link href="/">
            <img src="/images/logo.png" alt="Logo" />
          </Link>
        </div>

        {/* دکمه همبرگر برای موبایل */}
        <button className={styles.hamburger} onClick={toggleMenu}>
          <FaBars />
        </button>

        <ul className={`${styles.links} ${isMenuOpen ? styles.open : ""}`}>
          <li>
            <Link href="/">صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/category">فروشگاه</Link>
          </li>
          <li>
            <Link href="/blog">وبلاگ</Link>
          </li>
          <li>
            <Link href="/contact-us">تماس با ما</Link>
          </li>
          <li>
            <Link href="/aboutUs">درباره ما</Link>
          </li>
          <li>
            <Link href="/rules">قوانین</Link>
          </li>
          {!isLogin ? (
            <li>
              <Link href="/login-register">ورود / عضویت</Link>
            </li>
          ) : (
            <div className={styles.dropdown}>
              <Link href="/p-user">
                <IoIosArrowDown className={styles.dropdown_icons} />
                حساب کاربری
              </Link>
              <div className={styles.dropdown_content}>
                <Link href="/p-user/orders">سفارشات</Link>
                <Link href="/p-user/tickets">تیکت های پشتیبانی</Link>
                <Link href="/p-user/comments">کامنت‌ها</Link>
                <Link href="/p-user/wishlist">علاقه‌مندی‌ها</Link>
                <Link href="/p-user/account-details">جزئیات اکانت</Link>
              </div>
            </div>
          )}
        </ul>

        <div className={styles.navbar_icons}>
          <Link href="/cart">
            <FaShoppingCart />
            <span>1</span>
          </Link>
          <Link href="/wishlist">
            <FaRegHeart />
            <span>1</span>
          </Link>
        </div>
      </main>
    </nav>
  );
}

export default Navbar;
