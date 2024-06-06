import ChatMessages from "../components/ChatMessages";
import MyAccount from "../components/MyAccount";
import YourFiends from "../components/YourFiends";
const ChatPage = () => {
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex flex-row bg-pink-900 ">
          <MyAccount />
          <YourFiends />
          <ChatMessages />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
