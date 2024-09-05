import React, { useEffect, useState } from "react";

import { Carousel, Modal } from "antd";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useLocation } from "react-router-dom";

import ChatMessages from "../components/ChatMessages";
import MyAccount from "../components/MyAccount";
import { db } from "../firebase/config";
import { useRoomStore } from "../utils";

type User = {
  uid: string;
};
type UserData = {
  uid: string;
  displayName: string;
  avt: string;
};
const ChatPage = () => {
  const location = useLocation();
  const state = location.state;
  const [selectedUid, setSelectedUid] = useState("");
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState<UserData[]>([]);
  // const [listRooms, setListRooms] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { listRoomsStore, setListRoomsStore }: any = useRoomStore();

  useEffect(() => {
    const getRooms = async () => {
      const unsubscribe = onSnapshot(
        collection(db, "rooms"),
        async (snapshot) => {
          const rooms: any = [];
          const roomPromises: any = [];

          snapshot.docs.forEach((doc) => {
            const roomData: any = { id: doc.id, ...doc.data() };
            if (roomData.users.some((user: any) => user.uid === state.uid)) {
              roomData.users.forEach((user: any) => {
                if (user.uid !== state.uid) {
                  const q = query(
                    collection(db, "users"),
                    where("uid", "==", user.uid),
                  );
                  roomPromises.push(getDocs(q));
                }
              });
            }
          });

          const roomResults = await Promise.all(roomPromises);

          roomResults.forEach((querySnapshot) => {
            querySnapshot.forEach((userDoc: any) => {
              rooms.push(userDoc.data());
            });
          });
          setListRoomsStore(rooms);
          //setListRooms(rooms);
        },
      );

      return unsubscribe;
    };

    getRooms();
  }, [state.uid, setListRoomsStore]);
  useEffect(() => {}, [search]);

  const showModal = () => {
    setIsOpenModal(true);
    setLoading(true);
    setSearch("");
    setSearchData([]);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      handleSearchUser(search);
    }, 500); // Thời gian debounce là 500ms
    return () => clearTimeout(delaySearch);
  }, [search]);

  const handleSearchUser = async (searchString: string) => {
    const q = query(
      collection(db, "users"),
      where("keywords", "array-contains", searchString),
    );
    const querySnapshot = await getDocs(q);
    const results: UserData[] = [];
    querySnapshot.forEach((doc) => {
      results.push(doc.data() as UserData);
    });
    setSearchData(results);
  };

  const handleClick = async (uid: string) => {
    setIsOpenModal(false);
    const roomID = `ROM${Math.floor(Math.random() * 1000000001)}`;

    // Truy vấn tất cả các phòng hiện có
    const q1 = query(collection(db, "rooms"));
    const querySnapshot1 = await getDocs(q1);

    let roomExists = false;

    // Kiểm tra xem đã có phòng nào chứa cả hai người dùng chưa
    querySnapshot1.forEach((doc) => {
      const users = doc.data().users;
      const hasUid = users.some((user: User) => user.uid === uid);
      const hasStateUid = users.some((user: User) => user.uid === state.uid);

      // Nếu cả hai người dùng đều có trong phòng, phòng đã tồn tại
      if (hasUid && hasStateUid) {
        // console.log("Phòng đã tồn tại.");
        roomExists = true;
      }
    });

    if (!roomExists) {
      // Nếu không tìm thấy phòng chứa cả hai người dùng, tạo phòng mới
      // console.log("Tạo phòng mới.");
      await setDoc(doc(db, "rooms", roomID), {
        type: "single",
        users: [
          {
            uid: uid,
          },
          {
            uid: state.uid,
          },
        ],
      });
      await setDoc(doc(db, "messages", roomID), {
        roomID: roomID,
        senderID: state.uid,
        message: [],
        createAt: new Date(),
        updateAt: new Date(),
      });
      // console.log("Tạo rồi");
    } else {
      // console.log("Phòng đã tồn tại.");
    }

    setSelectedUid(uid);
  };

  const handleClickChat = async (uid: string) => {
    setSelectedUid(uid);
  };

  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex flex-row bg-pink-900 ">
          <MyAccount />
          <div className="flex flex-col gap-1 basis-custom h-screen bg-pink-700 rounded-tl-xl p-2">
            <button
              className="bg-pink-600 w-5/5 m-1 rounded-lg"
              onClick={showModal}
            >
              <input
                type="text"
                placeholder="Search your friend...."
                className="text-sm text-white bg-pink-600 px-2 w-5/6 rounded-bl-lg rounded-tl-lg placeholder-gray-300 placeholder-5xl"
              />
              <button
                className="text-lg text-white bg-pink-600 px-2 rounded-br-lg rounded-tr-lg"
                type="submit"
              >
                <i className="fa-solid fa-magnifying-glass fa-flip-horizontal fa-sm text-center"></i>
              </button>
            </button>
            <p className="text-white m-2">{`Tất cả (${listRoomsStore.length}) cuộc thoại`}</p>

            <div className="flex flex-col gap-1 basis-96 h-screen bg-pink-700 p-2">
              {listRoomsStore.map((item: any, index: any) => (
                <button
                  key={index}
                  className="flex flex-row justify-start items-center bg-pink-900"
                  onClick={() => handleClickChat(item.uid)}
                >
                  <img
                    src={item.avt}
                    alt="USER AVT"
                    className="w-16 h-16 border-2 border-white"
                  />
                  <p className="pl-4 text-white">{item.displayName}</p>
                </button>
              ))}
            </div>
          </div>

          {selectedUid ? (
            <ChatMessages uid={selectedUid} />
          ) : (
            <div className="flex flex-col basis-full h-screen pr-2">
              <div className="flex flex-col justify-center items-center">
                <h1 className="font-sans text-3xl font-bold	text-white">
                  Chào mừng bạn đến với Chat real time
                </h1>
                <p className="font-sans text-lg text-white">
                  Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng
                  người thân, bạn bè của bạn
                </p>
              </div>
              <div className="w-[700px]">
                <Carousel autoplay>
                  <div>1</div>

                  <div>2</div>

                  <div>3</div>

                  <div>4</div>
                </Carousel>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal
        title={<p className="font-extrabold text-lg">ADD TO ROOM CHAT</p>}
        loading={loading}
        open={isOpenModal}
        onCancel={() => setIsOpenModal(false)}
        footer={null}
      >
        {/* <form action="" onChange={handleSearchUser}>
          <div className="bg-pink-600 w-5/5 m-1 rounded-lg">
            <input
              type="text"
              value={search}
              placeholder="Search your friend...."
              className="text-lg text-white bg-pink-600 px-2 w-5/6 rounded-bl-lg rounded-tl-lg placeholder-gray-300 placeholder-5xl"
              onChange={handleOnChangeInput}
            />
            <button
              className="text-lg text-white bg-pink-600 px-2 rounded-br-lg rounded-tr-lg"
              type="submit"
              onClick={handleSubmit}
            >
              <i className="fa-solid fa-magnifying-glass fa-flip-horizontal fa-sm text-center"></i>
            </button>
          </div>
        </form> */}
        <form onSubmit={handleSubmit}>
          <div className="bg-pink-600 w-5/5 m-1 rounded-lg">
            <input
              type="text"
              value={search}
              placeholder="Search your friend...."
              className="text-lg text-white bg-pink-600 px-2 w-5/6 rounded-bl-lg rounded-tl-lg placeholder-gray-300 placeholder-5xl"
              onChange={handleOnChangeInput}
            />
            <button
              className="text-lg text-white bg-pink-600 px-2 rounded-br-lg rounded-tr-lg"
              type="submit"
            >
              <i className="fa-solid fa-magnifying-glass fa-flip-horizontal fa-sm text-center"></i>
            </button>
          </div>
        </form>

        {searchData &&
          searchData.map((item, index) => (
            <div key={index} className="bg-pink-100 rounded-r-lg">
              <button
                className="flex flex-row justify-start items-center "
                onClick={() => handleClick(item.uid)}
              >
                <img
                  src={item.avt}
                  alt="USER AVT"
                  className="w-16 h-16 border-2 border-white"
                />
                <p className="pl-4">{item.displayName}</p>
              </button>
            </div>
          ))}
      </Modal>
    </div>
  );
};

export default ChatPage;
