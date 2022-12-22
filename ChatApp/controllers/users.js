import bcrypt from "bcrypt";
import db from "../config/dbElephantSql.js";

// here I do all the db("users") things and I export them and use them in routes
// here I would do something like export const getUsers = async(req,res) => {try and catch if with async, .then and .catch if no async}
// use bcrypt const salt = await bcrypt.genSalt();
// const hash = await bcrypt.hash(password,salt); when you insert password you insert hash, password is sent in req.body and you do bcrypt on it
// here we should also get the users to show on the side so that you see who you can chat with. we send over the id and maybe other things

// register 
// do async await here and try and catch
// we do bcrypt here, we insert into the database, since username is unique if we try to insert a username
// that already exists we will get an error and go into the catch so here we send a status of 404 and send a message saying username already exists

// router.post("/register", register);
export const register = async(req,res) => {
    const {username,password} = req.body;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password,salt);

    try {
        await db("users")
        .insert({
            username,
            password: hash
        });
        res.status(200);
    } catch (err) {
        res.status(404).json({msg: "Username already exists"});
    }
}

// login 
// first we find the user where the username is equal to the username sent in the body 
// if it doesn't we go to the catch and send the message email not found and a bad status
// if it does we compare the passwords with .compare if there's no match we return a bad status of 400 and say password is wrong in the message
// if the username and pass are right we do the get and we send over what we need 
// do a console.log first to see what we get when we send over id

export const login = async(req,res) => {
    const {username,password} = req.body;

    try {
        const user = await db("users")
        .select("user_id", "username", "password")
        .where({username});

        const match = await bcrypt.compare(password, user[0].password);
        if (!match) {
            return res.status(400).json({msg: "Incorrect password"});
        }
        res.status(200).json({id: user[0].user_id});
    } catch (err) {
        res.status(400).json({msg: "Username doesn't exist"});
    };
};

export const getUsers = async(req,res) => {
    const {from_id} = req.params;
    try {
        const users = await db("users")
        .select("user_id", "username")
        .whereNot({user_id: from_id});

        res.status(200).json({users});
    } catch (err) {
        res.status(404).json({msg: "Can't find users"});
    }
};