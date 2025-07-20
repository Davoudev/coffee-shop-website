"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "@/components/templates/p-admin/discounts/table.module.css";

const AddDiscount = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [percent, setPercent] = useState("");
  const [maxUse, setMaxUse] = useState("");
  const [products, setProducts] = useState([]);
  const [productID, setProductID] = useState([]);
  const [uses, setUses] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };
    getProducts();
  }, []);

  const addDiscount = async () => {
    const discounts = {
      code,
      percent: Number(percent),
      maxUse: Number(maxUse),
      uses: Number(uses),
      productID,
    };
    // validation
    const res = await fetch("/api/discount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(discounts),
    });

    if (res.status === 201) {
      swal({
        title: "کد تخفیف با موفقیت ایجاد شد",
        icon: "success",
        buttons: "فهمیدم",
      }).then(() => {
        setCode("");
        setPercent("");
        setMaxUse("");
        router.refresh();
      });
    }
  };
  return (
    <section className={styles.discount}>
      <p>افزودن کد تخفیف جدید</p>
      <div className={styles.discount_main}>
        <div>
          <label>شناسه تخفیف</label>
          <input
            placeholder="لطفا شناسه تخفیف را وارد کنید"
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
          />
        </div>
        <div>
          <label>درصد تخفیف</label>
          <input
            placeholder="لطفا درصد تخفیف را وارد کنید"
            type="text"
            value={percent}
            onChange={(event) => setPercent(event.target.value)}
          />
        </div>
        <div>
          <label>حداکثر استفاده</label>
          <input
            placeholder="حداکثر استفاده از کد تخفیف"
            type="text"
            value={maxUse}
            onChange={(event) => setMaxUse(event.target.value)}
          />
        </div>
        <div>
          <label>محصول</label>
          <select
            name=""
            id=""
            onChange={(event) => setProductID(event.target.value)}
          >
            <option value={-1}>لطفا یک مورد را انتخاب نمایید.</option>
            {products.map((product) => (
              <option value={product._id} key={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button onClick={addDiscount}>افزودن</button>
    </section>
  );
};

export default AddDiscount;
