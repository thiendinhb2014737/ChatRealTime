import { useState } from "react";

import { Button, Modal } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import logoGoogle from "../assets/images/imgGoogle.png";
import imgLogo from "../assets/images/imgLogo.png";
import msg1 from "../assets/images/msg1.png";
import msg2 from "../assets/images/msg2.png";
import msg3 from "../assets/images/msg3.png";
import textLogo from "../assets/images/textLogo.png";
import { auth, db } from "../firebase/config";

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const MESSAGES = [
    {
      label: "msg1",
      img: msg1,
    },
    {
      label: "msg2",
      img: msg2,
    },
    {
      label: "msg3",
      img: msg3,
    },
  ];
  const showModal = () => {
    setIsOpenModal(true);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);

      // const getUser = doc(db, "users", result.user.uid);
      // const docUser = await getDoc(getUser);

      const q = query(
        collection(db, "users"),
        where("uid", "==", result.user.uid),
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty === true) {
        try {
          await addDoc(collection(db, "users"), {
            displayName: result.user.displayName,
            email: result.user.email,
            avt: result.user.photoURL,
            uid: result.user.uid,
          });
        } catch (e) {
          //
        }
      }
      navigate("/chat", {
        state: {
          name: result.user.displayName,
          email: result.user.email,
          avt: result.user.photoURL,
          uid: result.user.uid,
        },
      });
    } catch (error) {
      //
    }
  };
  return (
    <div className="flex flex-row gap-6 justify-center items-center bg-pink-200 ">
      <div className="basis-2/4 overflow-x-hidden">
        <ul className="flex gap-6 animate-slide">
          {MESSAGES.map((item, index) => (
            <li key={index}>
              <img src={item.img} alt={item.label} />
            </li>
          ))}
        </ul>
      </div>
      <div className="flex basis-1/4 gap-6">
        <img className="w-28 h-28 rounded-3xl" src={imgLogo} alt="LOGO" />
        <img className="w-36 h-28 rounded-3xl" src={textLogo} alt="LOGO" />
      </div>

      <div className="flex flex-row basis-1/4 gap-6 justify-center items-center">
        <Button
          className="text-lg text-white bg-pink-500 rounded-3xl p-4"
          onClick={showModal}
        >
          Sign up
        </Button>
        <Button className="text-lg text-white bg-pink-500 rounded-3xl p-4">
          Sign in
        </Button>
      </div>
      <Modal
        title={<p className="font-extrabold text-lg">SIGN IN</p>}
        loading={loading}
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={null}
      >
        <h1 className="text-slate-400">
          Please log in with your Google account!
        </h1>
        <Button
          className="text-lg text-white bg-pink-500 w-full rounded-3xl p-6 mt-6"
          onClick={handleGoogleLogin}
        >
          <img className="w-10 h-10" src={logoGoogle} alt="logo - google" />
          Sign in with your Google account
        </Button>
        <div className="text-center text-slate-400 mt-6">
          Bằng cách tiếp tục, bạn{" "}
          <span className="text-indigo-600">
            đồng ý với Điều khoản dịch vụ của Google
          </span>{" "}
          và xác nhận rằng bạn đã đọc Chính sách quyền riêng tư của chúng tôi.
          Thông báo khi thu thập.
        </div>
      </Modal>
    </div>
  );
};

export default Header;
