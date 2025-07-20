import Table from "@/components/templates/p-admin/discounts/Table";
import Layout from "@/components/layouts/AdminPanelLayout";
import styles from "@/components/templates/p-admin/discounts/table.module.css";
import connectToDB from "@/configs/db";
import DiscountModel from "@/models/Discount";
import AddDiscount from "@/components/templates/p-admin/discounts/AddDiscount";

const Discounts = async () => {
  connectToDB();

  const discounts = await DiscountModel.find({})
    .sort({ _id: -1 })
    .populate("user")
    .populate("product")
    .lean();

  return (
    <Layout>
      <main>
        <AddDiscount />
        {discounts.length === 0 ? (
          <p className={styles.empty}>کد تخفیفی وجود ندارد</p>
        ) : (
          <Table
            title="لیست تخفیفات"
            discounts={JSON.parse(JSON.stringify(discounts))}
          />
        )}
      </main>
    </Layout>
  );
};

export default Discounts;
