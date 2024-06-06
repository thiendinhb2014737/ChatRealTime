import ChatPage from "../src/pages/ChatPage";
import HomePage from "../src/pages/HomePage";
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
];
