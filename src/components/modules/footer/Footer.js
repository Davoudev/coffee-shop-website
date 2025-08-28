import styles from "./footer.module.css";
import { MdOutlineCopyright } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import Article from "./Article";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.gridContainer}>
          <section className={styles.companyInfo}>
            <img
              src="/images/logo_light.png"
              alt="قهوه ست"
              className={styles.logo}
            />
            <p className={styles.companyTitle}>
              شرکت فنجان داغ خوارزمی، فروشگاه اینترنتی قهوه ست
            </p>
            <div className={styles.infoItem}>
              <FaRegHeart className={styles.icon} />
              <p>
                تهران. شریف آباد . شهرک صنعتی خوارزمی فاز 2 . بلوار بهارستان.
                خیابان ماگنولیا بلوک آ117
              </p>
            </div>
            <div className={styles.infoItem}>
              <FaRegHeart className={styles.icon} />
              <p>پیگیری سفارشات : 02188305827</p>
            </div>
            <div className={styles.infoItem}>
              <FaRegHeart className={styles.icon} />
              <p>support [at] set-coffee.com</p>
            </div>
          </section>

          <section className={styles.latestArticles}>
            <h4 className={styles.sectionTitle}>جدیدترین نوشته ها</h4>
            <Article
              href={"/article/123"}
              data="۱۷ آبان ۱۴۰۲ "
              comments="بدون دیدگاه"
              img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
              title="افزایش انرژی با پودر قهوه فوری"
            />
            <hr className={styles.divider} />
            <Article
              href={"/article/123"}
              data="۱۷ آبان ۱۴۰۲ "
              comments="بدون دیدگاه"
              img="https://set-coffee.com/wp-content/uploads/elementor/thumbs/IMG_20230920_130854_091-qconsqrfwm7t626t2hckfjifv0kdd7cofsbfd1jcig.jpg"
              title="افزایش انرژی با پودر قهوه فوری"
            />
          </section>

          <section className={styles.footerMenu}>
            <h4 className={styles.sectionTitle}>منوی فوتر</h4>
            <ul>
              <li>
                <Link href={"/contact-us"}>تماس با ما</Link>
              </li>
              <li>
                <Link href={"/about-us"}>درباره ما</Link>
              </li>
              <li>
                <Link href={"/rules"}>قوانین</Link>
              </li>
            </ul>
          </section>

          <section className={styles.quickLinks}>
            <h4 className={styles.sectionTitle}>دسترسی سریع</h4>
            <ul>
              <li>
                <Link href={"/category"}>فروشگاه</Link>
              </li>
              <li>
                <Link href={"/articles"}>مقالات</Link>
              </li>
              <li>
                <Link href={"/cart"}>سبد خرید</Link>
              </li>
              <li>
                <Link href={"/wishlist"}>علاقه مندی ها</Link>
              </li>
            </ul>
          </section>

          <div className={styles.licenses}>
            <img src="/images/license4.htm" alt="لایسنس 1" />
            <img src="/images/license1.png" alt="لایسنس 2" />
            <img src="/images/license3.png" alt="لایسنس 3" />
            <img src="/images/license2.svg" alt="لایسنس 4" />
          </div>
        </div>

        {/* <Hr className={styles.footerDivider} /> */}

        <p className={styles.copyright}>
          2023 <MdOutlineCopyright /> تمام حقوق متعلق است به{" "}
          <strong>قهوه ست</strong> | طراحی و اجرا <strong>نیلامارکتینگ</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
