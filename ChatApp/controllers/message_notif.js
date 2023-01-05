import db from "../config/dbElephantSql.js";

export const getNotifs = async(req,res) => {
    const {fromUserId} = req.params;
    try {
        const result = await db("online_notif")
        .select("last_logged_in")
        .where({user_id: fromUserId});

        const notifs = await db("messages")
        .select("from_id")
        .where({to_id: fromUserId})
        .andWhere("timestamp", ">", result[0].last_logged_in);

        res.status(200).json({notifs});
    } catch (err) {
    }
};