import { useEffect, useMemo, useRef, useState } from "react";

import { Modal } from "antd";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";

import { db } from "../firebase/config";
import { useChatStore, userStore } from "../utils";

const ChatMessages = (uid: any) => {
  const [message, setMessage] = useState("");
  const location = useLocation();
  const state = location.state;
  const [roomID, setRoomID] = useState("");
  //Một tham chiếu đến phần tử div để chúng ta có thể truy cập và thay đổi thuộc tính cuộn của nó.
  const scrollableDivRef = useRef<HTMLDivElement | null>(null);
  const { user, setUserStore }: any = userStore();
  //const { chatStore, setChatStore } = useChatStore();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const roomIdStore = useChatStore((state: any) => state.roomIdStore);
  const setRoomIdStrore = useChatStore((state: any) => state.setRoomIdStrore);
  const chatStore = useChatStore((state: any) => state.chatStore);
  const setChatStore = useChatStore((state: any) => state.setChatStore);
  const navigate = useNavigate();

  useMemo(async () => {
    const getDATA = async () => {
      const q = query(collection(db, "users"), where("uid", "==", uid.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setUserStore(doc.data());
        });
      });

      // Remember to unsubscribe when component unmounts
      return unsubscribe;
    };
    const q1 = query(collection(db, "rooms"));
    const querySnapshot1 = await getDocs(q1);

    querySnapshot1.forEach((doc) => {
      const users = doc.data().users;
      const hasUid = users.some((user: any) => user.uid === uid.uid);
      const hasStateUid = users.some((user: any) => user.uid === state.uid);

      if (hasUid && hasStateUid) {
        setRoomID(doc.id);
      }
    });
    const getMessages = async () => {
      onSnapshot(doc(db, "messages", roomID), () => {
        setRoomIdStrore(roomID);
      });
    };
    getMessages();
    getDATA();
  }, [state, uid, roomID, setUserStore, setRoomID, setRoomIdStrore]);

  useEffect(() => {
    const getMessagess = async () => {
      onSnapshot(doc(db, "messages", roomID), (doc) => {
        const data = doc.data();
        if (data && data.message) {
          setChatStore({ [roomIdStore]: data.message });
        }
      });
    };
    getMessagess();
  }, [roomID, roomIdStore, setChatStore]);
  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatStore]);
  const handleOnChangeInput = (event: any) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event: any) => {
    let d = new Date();
    event.preventDefault();

    await updateDoc(doc(db, "messages", roomID), {
      message: arrayUnion({
        message: message,
        sender: state.uid,
        createAt: d.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
        updateAt: d.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }),
      }),
    });

    setMessage("");
  };

  const handleCallVideo = async () => {
    navigate("/call-video");
  };

  return (
    <div className="flex flex-col basis-full h-screen pr-2">
      <div className="flex flex-row justify-center items-center bg-pink-900 h-12">
        <div className="bg-pink-600 w-[35px] h-[35px] m-1 rounded-lg flex justify-center items-center">
          <button onClick={handleCallVideo}>
            <i
              className="fa-solid fa-phone fa-xl"
              style={{ color: "white" }}
            ></i>
          </button>
        </div>
      </div>
      <div
        ref={scrollableDivRef}
        className="flex flex-col h-custom bg-pink-100 overflow-y-scroll"
      >
        {chatStore[roomIdStore] &&
          chatStore[roomIdStore].map((item1: any, index: any) =>
            item1.sender === uid.uid ? (
              <div key={index} className="flex flex-col m-2">
                <p className="text-xs text-gray-400 ml-1">{user.displayName}</p>
                <div className="flex flex-row gap-2 justify-start items-center m-1">
                  <img src={user.avt} alt="" className="w-8 h-8 rounded-full" />
                  <p className="text-white bg-pink-400 rounded-r-md rounded-tl-md p-2">
                    {item1.message}
                  </p>
                </div>
                <p className="text-xs text-neutral-300 ml-1">
                  {item1.createAt}
                </p>
              </div>
            ) : (
              <div
                key={index}
                className="flex flex-col justify-end items-end m-2"
              >
                <p className="text-white bg-pink-600 rounded-l-md rounded-tr-md p-2">
                  {item1.message}
                </p>
                <p className="text-xs text-neutral-300 ml-1">
                  {item1.createAt}
                </p>
              </div>
            ),
          )}
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center items-center shadow shadow-pink-400">
          <input
            type="text"
            value={message}
            className="text-lg text-white bg-pink-600 px-2 w-11/12 h-11"
            onChange={handleOnChangeInput}
          />
          <button
            className="text-lg text-white bg-pink-600 px-2 w-24 h-11"
            type="submit"
          >
            <i className="fa-regular fa-paper-plane fa-xl"></i>
          </button>
        </div>
      </form>
      <Modal
        title={<p className="font-extrabold text-lg">CALL VIDEO</p>}
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
        }}
        footer={null}
        centered
        forceRender
        width={1080}
      ></Modal>
    </div>
  );
};

export default ChatMessages;
