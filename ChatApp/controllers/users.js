import bcrypt from "bcrypt";
import db from "../config/dbElephantSql.js";

export const register = async (req, res) => {
  const { username, password } = req.body;
  const salt = await bcrypt.genSalt();
  const hash = await bcrypt.hash(password, salt);

  try {
    await db("users").insert({
      username,
      password: hash,
    });
    res.sendStatus(200);
  } catch (err) {
    res.status(404).json({ msg: "Username already exists" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db("users")
      .select("user_id", "username", "password")
      .where({ username });

    const match = await bcrypt.compare(password, user[0].password);
    if (!match) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(400).json({ msg: "Username doesn't exist" });
  }
};

export const logout = async (req, res) => {
  const { timestamp, fromUserId } = req.body;
  try {
    await db("online_notif")
      .update({
        online_status: false,
        last_logged_in: timestamp,
      })
      .where({ user_id: fromUserId });

    res.sendStatus(200);
  } catch (err) {}
};
