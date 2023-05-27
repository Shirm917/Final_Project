import ChatIcon from '@mui/icons-material/Chat';

const Home = () => {

    return (
        <section className="homeContainer">
            <ChatIcon className="chatIcon" sx={{width: 100, height: 100}} />
            <h1 className="homeTitle">Chat App</h1>
            {/* Expanation: "A Chat App With Private Messaging and Temporary Group Messaging. In Chat Click Private Chat Tab To Chat Privately With Friends and Click Group Chat Tab To Join A Room and Chat With People In The Same Room. Rooms Are Temporary So Once You Join Another Or Logout, The Messages Will Disappear." */}
        </section>
    );
};

export default Home;
