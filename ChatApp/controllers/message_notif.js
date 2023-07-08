import db from "../config/dbElephantSql.js";

export const getBadgeNotifs = async (req, res) => {
  const { fromUserId } = req.params;
  try {
    const badgeNotifs = await db("messages")
      .select("from_id", "message_uuid")
      .where({ to_id: fromUserId })
      .andWhere("has_been_read", false);

    res.status(200).json({ badgeNotifs });
  } catch (err) {}
};

export const updateNotifications = async (req, res) => {
  const { userBadgeNotifs } = req.body;
  try {
    const messageUuids = userBadgeNotifs.map((element) => element.message_uuid);
    await db("messages")
      .whereIn("message_uuid", messageUuids)
      .update("has_been_read", true);

    res.sendStatus(200);
  } catch (err) {
    console.log("update notifications err", err);
  }
};
