const LoginRegister = (props) => {
    const {title} = props;
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