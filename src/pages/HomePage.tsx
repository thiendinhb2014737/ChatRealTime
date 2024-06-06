import brand1 from "../assets/images/brand1.png";
import brand2 from "../assets/images/brand2.png";
import brand3 from "../assets/images/brand3.png";
import brand4 from "../assets/images/brand4.png";
import brand5 from "../assets/images/brand5.png";
import imgChatMsg from "../assets/images/imgChatMsg.png";
import Footer from "../components/Footer";
import Header from "../components/Header";

const HomePage = () => {
  const BRAND = [
    {
      label: "brand1",
      img: brand1,
    },
    {
      label: "brand2",
      img: brand2,
    },
    {
      label: "brand3",
      img: brand3,
    },
    {
      label: "brand4",
      img: brand4,
    },
    {
      label: "brand5",
      img: brand5,
    },
  ];
  return (
    <div>
      <Header />
      <div className="bg-pink-50 h-full py-24">
        <div className="flex flex-row gap-6 justify-center items-center">
          <div className="flex flex-col gap-6 justify-center items-center">
            <h1 className="max-w-3xl text-5xl font-bold text-center mb-4">
              Chat with ChatGPT, Get Instant Answers, Broad Knowledge!
            </h1>
            <h1 className="max-w-4xl text-2xl font-medium text-center">
              Whether it's work, study, or life, ChatGPT is always ready to
              provide you with information and optimal solutions!
            </h1>
            <button className="text-lg text-white bg-pink-500 rounded-3xl p-4">
              GET START NOW
            </button>
          </div>
          <img
            className="max-w-lg shadow-2xl"
            src={imgChatMsg}
            alt="CHAT-MESSAGE"
          />
        </div>

        <div className="flex flex-col gap-6 justify-center items-center mt-24">
          <h3 className="max-w-4xl text-2xl font-medium text-center">
            Trusted by 100 000+ active customers worldwide
          </h3>
          <div className=" overflow-x-hidden">
            <ul className="flex flex-row gap-2 animate-slide">
              {BRAND.map((item, index) => (
                <li key={index}>
                  <img src={item.img} alt={item.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
