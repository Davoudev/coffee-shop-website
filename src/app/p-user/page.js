import Layout from "@/components/layouts/UserPanelLayout";
import styles from "@/styles/p-user/index.module.css";
import Tickets from "@/components/templates/p-user/index/Tickets";
import Orders from "@/components/templates/p-user/index/Orders";
import { authUser } from "@/utils/auth-server";
import { redirect } from "next/navigation";
import TicketModel from "@/models/Ticket";
import CommentModel from "@/models/Comment";
import WishlistModel from "@/models/Wishlist";
import Box from "@/components/modules/infoBox/InfoBox";
// import { useRouter } from "next/navigation";

const page = async () => {
  const user = await authUser();
  if (!user) {
    redirect("/login-register");
  }
  const ticket = await TicketModel.find({ user: user._id })
    .limit(3)
    .populate("department", "title")
    .sort({ _id: -1 })
    .lean();
  const allTicket = await TicketModel.find({ user: user._id });
  const comments = await CommentModel.find({ user: String(user._id) });
  const wishlists = await WishlistModel.find({ user: user._id });

  return (
    <Layout>
      <main>
        <section className={styles.boxes}>
          <Box title="مجموع تیکت ها " value={allTicket.length} />
          <Box title="مجموع کامنت ها " value={comments.length} />
          <Box title="مجموع سفارشات" value="2" />
          <Box title="مجموع علاقه مندی ها" value={wishlists.length} />
        </section>
        <section className={styles.contents}>
          <Tickets tickets={JSON.parse(JSON.stringify(ticket))} />
          <Orders />
        </section>
      </main>
    </Layout>
  );
};

export default page;
