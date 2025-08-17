import styles from "@/styles/p-user/index.module.css";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/auth-server";
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import WishListModel from "@/models/Wishlist";
import Box from "@/components/modules/infoBox/InfoBox";
import Layout from "@/components/layouts/UserPanelLayout";
import RefreshClient from "@/utils/RefreshClient";

const page = async () => {
  let user = await authUser();

  let tickets = await TicketModel.find({ user: user?._id, isAnswer: false })
    .limit(3)
    .populate("department", "title")
    .sort({ _id: -1 })
    .lean();

  let allTickets = await TicketModel.find({ user: user?._id });
  let comments = await CommentModel.find({ user: String(user?._id) });
  let wishlists = await WishListModel.find({ user: user?._id });

  return (
    <Layout>
      {!user ? (
        <>
          <RefreshClient />
          <main>
            <p style={{ textAlign: "center", marginTop: "2rem" }}>
              در حال بررسی اعتبار شما...
            </p>
          </main>
        </>
      ) : (
        <main>
          <section className={styles.boxes}>
            <Box title="مجموع تیکت ها " value={allTickets.length} />
            <Box title="مجموع کامنت ها " value={comments.length} />
            <Box title="مجموع سفارشات" value="2" />
            <Box title="مجموع علاقه مندی ها" value={wishlists.length} />
          </section>
          <section className={styles.contents}>
            <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
            <Orders />
          </section>
        </main>
      )}
    </Layout>
  );
};

export default page;
