import { useLocation } from "react-router-dom";
const ChatMessages = () => {
  const location = useLocation();
  const state = location.state;

  const MESSEAGES = [
    {
      name: "Call me Dinh",
      msg: "Xin Chao",
    },
    {
      name: "Call me Dinh",
      msg: "Xin Chao",
    },
    {
      name: "Call me Dinh",
      msg: "Xin Chao",
    },
    {
      name: "Call me Dinh",
      msg: "Xin Chao",
    },
    {
      name: "Call me Dinh",
      msg: "Xin Chao",
    },
    {
      name: "Call me Dinh",
      msg: "Xin Chao",
    },
    {
      name: "Call me Dinh",
      msg: "Xin Chao",
    },
    {
      name: "Call me Dinh",
      msg: "Xin Chao",
    },
  ];
  return (
    <div className="flex flex-col basis-full h-screen pr-2">
      <div className="flex flex-row justify-center items-center bg-pink-900 h-12">
        <div className="bg-pink-600 w-3/5 m-1 rounded-lg">
          <input
            type="text"
            className="text-lg text-white bg-pink-600 px-2 w-5/6 rounded-bl-lg rounded-tl-lg"
          />
          <button className="text-lg text-white bg-pink-600 px-2 rounded-br-lg rounded-tr-lg">
            <i className="fa-solid fa-magnifying-glass fa-flip-horizontal fa-sm text-center"></i>
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-end h-4/5 bg-pink-100">
        {MESSEAGES.map((item, index) => (
          <div
            key={index}
            className="flex flex-row justify-start items-center m-2"
          >
            <img src={state.avt} alt="" className="w-8 h-8 rounded-full" />
            <p className="font-semibold">{item.name}:</p>
            <p className="ml-4">{item.msg}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center items-center">
        <input
          type="text"
          className="text-lg text-white bg-pink-600 px-2 w-11/12 h-11"
        />
        <button className="text-lg text-white bg-pink-600 px-2 w-24 h-11">
          <i className="fa-regular fa-paper-plane fa-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatMessages;
