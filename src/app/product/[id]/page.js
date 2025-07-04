import styles from "@/styles/product.module.css";
import Gallery from "@/components/templates/product/Gallery";
import Details from "@/components/templates/product/Details";
import Tabs from "@/components/templates/product/Tabs";
import MoreProducts from "@/components/templates/product/MoreProducts";

import Footer from "@/components/modules/footer/Footer";
import Navbar from "@/components/modules/navbar/Navbar";
import connectToDB from "@/configs/db";
import ProductModel from "@/models/Product";
// import { authUser } from "@/utils/auth";

const product = async ({ params }) => {
  // const user = await authUser();

  connectToDB();
  const productID = params.id;
  const product = await ProductModel.findByIdAndUpdate({
    _id: productID,
  }).populate("comments");

  const relatedProducts = await ProductModel.find({ smell: product.smell });

  return (
    <div className={styles.container}>
      <Navbar isLogin={true} />
      <div data-aos="fade-up" className={styles.contents}>
        <div className={styles.main}>
          <Details product={JSON.parse(JSON.stringify(product))} />
          <Gallery />
        </div>
        <Tabs product={JSON.parse(JSON.stringify(product))} />
        <MoreProducts relatedProducts={relatedProducts} />
      </div>
      <Footer />
    </div>
  );
};

export default product;
