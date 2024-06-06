import { useLocation, useNavigate } from "react-router-dom";

import textLogo from "../assets/images/textLogo.png";
import { auth } from "../firebase/config";
const MyAccount = () => {
  const location = useLocation();
  const state = location.state;
  const navigate = useNavigate();
  const handleSignOut = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-1 basis-20 h-screen bg-pink-900 p-2">
      <div>
        <img src={textLogo} alt="" className="rounded-lg" />
      </div>
      <div className="flex flex-col gap-2 justify-center items-center mb-12">
        <button>
          <img src={state.avt} alt="" className="rounded-lg" />
        </button>
        <p className="text-white text-xs">{state.name.substring(0, 8)}...</p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center my-2">
        <button>
          <i className="fa-solid fa-comment fa-fade fa-2xl"></i>
        </button>
        <p className="text-white text-xs">Messages</p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center my-2">
        <button>
          <i className="fa-solid fa-address-book fa-2xl"></i>
        </button>
        <p className="text-white text-xs">User book</p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center my-2">
        <button>
          <i className="fa-solid fa-bell fa-2xl"></i>
        </button>
        <p className="text-white text-xs">Notification</p>
      </div>
      <div className="flex flex-col gap-5 justify-center items-center my-2">
        <button>
          <i className="fa-solid fa-gear fa-2xl"></i>
        </button>
        <p className="text-white text-xs">Setting</p>
      </div>
      <div className="mt-36">
        <button
          className="text-white text-xs bg-pink-950 rounded px-3 py-1"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default MyAccount;
