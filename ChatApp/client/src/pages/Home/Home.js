import ChatIcon from '@mui/icons-material/Chat';

const Home = () => {

    return (
        <section className="homeContainer">
            <ChatIcon className="chatIcon" sx={{width: 100, height: 100}} />
            <h1 className="homeTitle">Chat App</h1>
            <p className="aboutText">A Chat App With Private Messaging and Temporary Group Messaging.</p>
        </section>
    );
};

export default Home;
