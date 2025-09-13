"use client";
import Link from "next/link";
import styles from "./table.module.css";
import totalStyles from "./totals.module.css";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import stateData from "@/utils/stateData";
import Select from "react-select";
import { showSwal } from "@/utils/helper";

const stateOptions = stateData();

const Table = () => {
  const [cart, setCart] = useState([]);
  const [discount, setDiscount] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);

  const [stateSelectedOption, setStateSelectedOption] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [citySelectedOption, setCitySelectedOption] = useState(null);

  const [changeAddress, setChangeAddress] = useState(false);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(localCart);
  }, []);

  useEffect(calcTotalPrice, [cart]);

  function calcTotalPrice() {
    let price = 0;
    if (cart.length) {
      price = cart.reduce(
        (prev, current) => prev + current.price * current.count,
        0
      );
    }
    setTotalPrice(price);
  }

  const updateCount = (id, newCount) => {
    if (newCount < 1) return;

    const updatedCart = cart.map((product) =>
      product.id === id ? { ...product, count: newCount } : product
    );

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const checkDiscount = async () => {
    const res = await fetch("api/discount/use", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: discount }),
    });
    if (res.status === 404) {
      return showSwal("کد تخفیف وارد شده معتبر نیست", "error", "تلاش مجدد");
    } else if (res.status === 422) {
      return showSwal("کد تخفیف وارد شده  منقضی شده", "error", "تلاش مجدد");
    } else if (res.status === 200) {
      const discountCode = await res.json();
      const newPrice = totalPrice - (totalPrice * discountCode.percent) / 100;
      setTotalPrice(newPrice);
      return showSwal("کد تخفیف وارد شده اعمال شد", "success", "فهمیدم");
    }
  };

  // وقتی استان انتخاب شد شهرها آپدیت بشن
  const handleStateChange = (selectedOption) => {
    setStateSelectedOption(selectedOption);
    setCitySelectedOption(null);

    if (selectedOption) {
      const cities = selectedOption.value.map((city) => ({
        label: city,
        value: city,
      }));
      setCityOptions(cities);
    } else {
      setCityOptions([]);
    }
  };

  return (
    <>
      <div className={styles.tabel_container}>
        {/* سبد خرید */}
        <table className={styles.table}>
          <thead>
            <tr>
              <th> جمع جزء</th>
              <th>تعداد</th>
              <th>قیمت</th>
              <th>محصول</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{(item.count * item.price).toLocaleString()} تومان</td>
                <td className={styles.counter}>
                  <div>
                    <span onClick={() => updateCount(item.id, item.count - 1)}>
                      -
                    </span>
                    <p>{item.count}</p>
                    <span onClick={() => updateCount(item.id, item.count + 1)}>
                      +
                    </span>
                  </div>
                </td>

                <td className={styles.price}>
                  {item.price.toLocaleString()} تومان
                </td>
                <td className={styles.product}>
                  <img
                    src="https://set-coffee.com/wp-content/uploads/2020/12/Red-box-DG--430x430.jpg"
                    alt=""
                  />
                  <Link href={"/"}>{item.name}</Link>
                </td>

                <td>
                  <IoMdClose
                    className={styles.delete_icon}
                    onClick={() => removeFromCart(item.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <section>
          <button className={styles.update_btn}> بروزرسانی سبد خرید</button>
          <div>
            <button className={styles.set_off_btn} onClick={checkDiscount}>
              اعمال کوپن
            </button>
            <input
              type="text"
              placeholder="کد تخفیف"
              value={discount}
              onChange={(event) => setDiscount(event.target.value)}
            />
          </div>
        </section>
      </div>

      <div className={totalStyles.totals}>
        <p className={totalStyles.totals_title}>جمع کل سبد خرید</p>

        <div className={totalStyles.subtotal}>
          <p>جمع جزء </p>
          <p>205,000 تومان</p>
        </div>

        <p className={totalStyles.motor}>
          پیک موتوری: <strong>30,000</strong>
        </p>

        <div className={totalStyles.address}>
          <p>حمل و نقل </p>
          <span>حمل و نقل به تهران (فقط شهر تهران).</span>
        </div>

        <p
          onClick={() => setChangeAddress((prev) => !prev)}
          className={totalStyles.change_address}
        >
          تغییر آدرس
        </p>

        {changeAddress && (
          <div className={totalStyles.address_details}>
            <Select
              value={stateSelectedOption}
              onChange={handleStateChange}
              isClearable
              placeholder="استان"
              isRtl
              isSearchable
              options={stateOptions}
            />

            <Select
              value={citySelectedOption}
              onChange={setCitySelectedOption}
              isClearable
              placeholder="شهر"
              isRtl
              isSearchable
              options={cityOptions}
              isDisabled={!stateSelectedOption}
            />

            <input type="number" placeholder="کد پستی" />
            <button onClick={() => setChangeAddress(false)}>بروزرسانی</button>
          </div>
        )}

        <div className={totalStyles.total}>
          <p>مجموع</p>
          <p>{totalPrice.toLocaleString()} تومان</p>
        </div>

        <Link href={"/checkout"}>
          <button className={totalStyles.checkout_btn}>
            ادامه جهت تصویه حساب
          </button>
        </Link>
      </div>
    </>
  );
};

export default Table;
