import Breadcrumb from "@/components/modules/breadcrumb/Breadcrumb";
import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import Form from "@/components/templates/contact-us/Form";
import Information from "@/components/templates/contact-us/Information";
import styles from "@/styles/contact-us.module.css";
import { authUser } from "@/utils/auth-server";
import Link from "next/link";
// import { authUser } from "@/utils/auth";

const page = async () => {
  const user = await authUser();

  return (
    <>
      <Navbar isLogin={user ? true : false} />
      <Breadcrumb route={"تماس با ما"} />

      <div className={styles.container}>
        <main className={styles.maps}>
          <section>
            <Map
              position={[31.309771, 48.65893]}
              center={[31.309771, 48.65893]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست ( دانشگاه)</h3>
              <p>خوزستان - اهواز - گلستان - دانشگاه شهید چمران اهواز</p>
              <p>061-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
          <section>
            <Map
              position={[31.309771, 48.65893]}
              center={[31.309771, 48.65893]}
            >
              <span> فروشگاه ما</span>
              <h3>آدرس فروشگاه حضوری قهوه ست ( دانشگاه)</h3>
              <p>خوزستان - اهواز - گلستان - دانشگاه شهید چمران اهواز</p>
              <p>061-88305827</p>
              <Link href="/about-us">درباره فروشگاه</Link>
            </Map>
          </section>
        </main>
      </div>

      <div className={styles.container}>
        <div className={styles.contents}>
          <Form />
          <Information />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default page;
