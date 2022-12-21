// here I do all the db("users") things and I export them and use them in routes
// here I would do something like export const getUsers = async(req,res) => {try and catch if with async, .then and .catch if no async}
// use bcrypt const salt = await bcrypt.genSalt();
// const hash = await bcrypt.hash(password,salt); when you insert password you insert hash, password is sent in req.body and you do bcrypt on it
// here we should also get the users to show on the side so that you see who you can chat with. we send over the id and maybe other things

// register 
// do async await here and try and catch
// we do bcrypt here, we insert into the database, since username is unique if we try to insert a username
// that already exists we will get an error and go into the catch so here we send a status of 404 and send a message saying username already exists




// login 
// first we find the user where the username is equal to the username send in the body 
// if it doesn't we go to the catch and send the message email not found and a bad status
// if it does we compare the passwords with .compare if there's no match we return a bad status of 400 and say password is wrong in the message
// if the username and pass are right we do the get and we send over what we need 
// do a console.log first to see what we get when we send over id