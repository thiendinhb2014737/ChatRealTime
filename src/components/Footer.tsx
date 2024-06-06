import imgLogo from "../assets/images/imgLogo.png";
import textLogo from "../assets/images/textLogo.png";
const Footer = () => {
  const FOOTERCONTENTS = [
    {
      label: "PRODUCT",
      CONTENT: [
        {
          label: "Live chat",
        },
        {
          label: "Chatbot",
        },
        {
          label: "Lead Generation",
        },
        {
          label: "Mira AI",
        },
      ],
    },
    {
      label: "RESOURCE",
      CONTENT: [
        {
          label: "Blog",
        },
        {
          label: "Case studies",
        },
        {
          label: "Help center",
        },
        {
          label: "Report scam",
        },
      ],
    },
    {
      label: "SOLUTIONS",
      CONTENT: [
        {
          label: "For customer care",
        },
        {
          label: "For e-commerce",
        },
        {
          label: "About us",
        },
        {
          label: "Join our team",
        },
      ],
    },
  ];
  return (
    <div className="flex flex-row gap-6 justify-center items-center bg-pink-200 py-8">
      <div className="flex basis-1/4 gap-6">
        <img className="w-28 h-28 rounded-3xl" src={imgLogo} alt="LOGO" />
        <img className="w-36 h-28 rounded-3xl" src={textLogo} alt="LOGO" />
      </div>
      <ul className="flex basis-2/4 gap-6 ">
        {FOOTERCONTENTS.map((item, index) => (
          <ul key={index} className="m-6">
            {item.label}
            <li className="mb-4">
              {item.CONTENT.map((content, index) => (
                <p key={index}>{content.label}</p>
              ))}
            </li>
          </ul>
        ))}
      </ul>
      <div className="flex flex-row basis-1/4 gap-6 justify-center items-center">
        <button className="w-36 text-sm text-white bg-pink-500 rounded-3xl p-4">
          <i className="fa-brands fa-apple fa-2xl px-3"></i>Download on the App
          Store
        </button>
        <button className="w-36 text-sm text-white bg-pink-500 rounded-3xl p-4">
          <i className="fa-brands fa-google-play fa-lg px-3"></i>Download on the
          Google Play
        </button>
      </div>
    </div>
  );
};

export default Footer;
