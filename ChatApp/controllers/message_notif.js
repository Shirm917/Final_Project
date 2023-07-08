import db from "../config/dbElephantSql.js";

export const getBadgeNotifs = async (req, res) => {
  const { fromUserId } = req.params;
  try {
    const badgeNotifs = await db("messages")
      .select("from_id")
      .where({ to_id: fromUserId })
      .andWhere("has_been_read", false);

    res.status(200).json({ badgeNotifs });
  } catch (err) {}
};
