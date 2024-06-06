import brand2 from "../assets/images/brand2.png";
const YourFiends = () => {
  const LISTUSERS = [
    {
      name: "Call me Dinh",
      img: brand2,
    },
    {
      name: "Call me Dinh",
      img: brand2,
    },
    {
      name: "Call me Dinh",
      img: brand2,
    },
    {
      name: "Call me Dinh",
      img: brand2,
    },
    {
      name: "Call me Dinh",
      img: brand2,
    },
    {
      name: "Call me Dinh",
      img: brand2,
    },
    {
      name: "Call me Dinh",
      img: brand2,
    },
    {
      name: "Call me Dinh",
      img: brand2,
    },
  ];
  return (
    <div className="flex flex-col gap-1 basis-96 h-screen bg-pink-700 rounded-tl-xl p-2">
      <p className="text-white">Tất cả ({LISTUSERS.length}) tin nhắn</p>
      {LISTUSERS.map((item, index) => (
        <div
          key={index}
          className="flex flex-row justify-start items-center bg-pink-900"
        >
          <img
            src={item.img}
            alt="USER AVT"
            className="w-16 h-16 border-2 border-white"
          />
          <p className="pl-4 text-white">{item.name}</p>
        </div>
      ))}
    </div>
  );
};

export default YourFiends;
