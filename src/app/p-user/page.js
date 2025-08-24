// page.js
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
  const user = await authUser();

  if (!user) {
    return (
      <Layout>
        <main>
          <RefreshClient />
          <p style={{ textAlign: "center", marginTop: "2rem" }}>
            در حال بررسی اعتبار شما...
          </p>
        </main>
      </Layout>
    );
  }

  const tickets = await TicketModel.find({ user: user._id, isAnswer: false })
    .limit(3)
    .populate("department", "title")
    .sort({ _id: -1 })
    .lean();

  const allTickets = await TicketModel.find({ user: user._id });
  const comments = await CommentModel.find({ user: String(user._id) });
  const wishlists = await WishListModel.find({ user: user._id });

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها" value={allTickets.length} />
          <Box title="مجموع کامنت ها" value={comments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={wishlists.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
