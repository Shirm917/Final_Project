import db from "../config/dbElephantSql.js";

export const getUserStatuses = async(req,res) => {
    const {fromUserId} = req.params;
    try {
        const userStatuses = await db("users")
        .select("users.user_id", "users.username", "online_notif.online_status")
        .leftJoin("online_notif", "users.user_id", "online_notif.user_id")
        .whereNot("users.user_id", fromUserId)

        res.status(200).json({userStatuses});
    } catch (err) {
        res.status(404).json({msg: "Can't find users"});
    }
}