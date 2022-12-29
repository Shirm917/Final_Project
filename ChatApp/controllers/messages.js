import db from "../config/dbElephantSql.js";


// here is the function to insert the messages into the database
export const insertMessage = async(req,res) => {
    const {text,fromUserId,toUserId,timestamp} = req.body;
    try {
        await db("messages")
        .insert({
            message: text,
            from_id: fromUserId,
            to_id: toUserId,
            timestamp
        })
        res.status(200);
    } catch (err) {
        console.log(err);
        res.status(400).json({msg: "Can't insert message"});
    };
};

// Getting all the messages for a specific chat
export const getMessages = async(req,res) => {
    const {from_id,to_id} = req.params;
    // console.log(req.params);
    try {
        const messages = await db("messages")
        .select("message","from_id","to_id")
        .where({
            from_id,
            to_id
        })
        .orWhere({
            from_id: to_id,
            to_id: from_id
        })
        .orderBy("timestamp", "asc");

        // console.log(messages);
        res.status(200).json({messages});
    } catch (err) {
        res.status(404).json({msg: "Can't find messages"});
    };
};