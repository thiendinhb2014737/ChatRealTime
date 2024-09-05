import { useState } from "react";

import { Button, Modal } from "antd";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

import brand1 from "../assets/images/brand1.png";
import brand2 from "../assets/images/brand2.png";
import brand3 from "../assets/images/brand3.png";
import brand4 from "../assets/images/brand4.png";
import brand5 from "../assets/images/brand5.png";
import imgChatMsg from "../assets/images/imgChatMsg.png";
import logoGoogle from "../assets/images/imgGoogle.png";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { auth, db } from "../firebase/config";
import { generateKeywords } from "../utils";

const HomePage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

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
            keywords: generateKeywords(result.user.displayName),
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
            <button
              className="text-lg text-white bg-pink-500 rounded-3xl p-4"
              onClick={showModal}
            >
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
      <Footer />
    </div>
  );
};

export default HomePage;
