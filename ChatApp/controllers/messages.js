// here is the function to insert the messages into the database
import db from "../config/dbElephantSql.js";

export const insertMessage = (req,res) => {
    const {text,fromUserId,toUserId,timestamp} = req.body;
    console.log(req.body);
}