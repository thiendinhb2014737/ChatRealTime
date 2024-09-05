import CallVideoPage from "../pages/CallVideoPage";
import ChatPage from "../pages/ChatPage";
import HomePage from "../pages/HomePage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/chat",
    page: ChatPage,
    isShowHeader: false,
  },
  {
    path: "/call-video",
    page: CallVideoPage,
    isShowHeader: false,
  },
];
