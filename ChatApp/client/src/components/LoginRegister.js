// if props.title === "Register" we do the posts here to send the user and pass to the db, set msg to an empty string and navigate to login, if there's an error then in the catch set the msg to an err which will be sent from the backend
// else when we login we post and send the user and pass we just put in in the body. we then check in the back end if the user and pass are right if yes we naviagte to chat and set msg back to an empty string if not we send the msg and we set msg to the err 


const LoginRegister = (props) => {
    const {title} = props;

    if (title === "")

    return (
        <div>
            <h1>{title}</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" />
            </form>
        </div>
    )
}

export default LoginRegister;