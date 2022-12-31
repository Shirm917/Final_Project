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
        console.log(err);
    }
};

export const fixNotifs = async(req,res) => {
    const {timestamp,fromUserId} = req.body;
    try {
        await db("online_notif")
            .update({
                last_logged_in: timestamp
            })
            .where({user_id: fromUserId});

            res.sendStatus(200);
    } catch (err) {
        console.log(err);
    }
};