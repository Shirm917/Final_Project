import db from "../config/dbElephantSql.js";

export const getUserStatuses = async(req,res) => {
    const {fromUserId} = req.params;
    try {
        const userStatuses = await db("users")
        .select("users.user_id", "users.username", "online_notif.online_status")
        .leftJoin("online_notif", "users.user_id", "online_notif.user_id")
        .whereNot("users.user_id", fromUserId)
        .orderBy("users.username", "asc");

        res.status(200).json({userStatuses});
    } catch (err) {
        res.status(404).json({msg: "Can't find users"});
    }
}

export const userStatus = async(req,res) => {
    const {fromId} = req.body;
    try {
        const row = await db("online_notif")
        .select("user_id")
        .where({user_id: fromId})

        if (!row || row.length === 0) {
            await db("online_notif")
            .insert({
                online_status: true,
                user_id: fromId
            });

            res.sendStatus(200);
        } else {
            await db("online_notif")
            .update({
                online_status: true,
            })
            .where({user_id: fromId})

            res.sendStatus(200);
        };
    } catch (err) {
        console.log(err);
    };
};