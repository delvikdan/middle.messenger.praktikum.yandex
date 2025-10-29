import "./styles/main.scss";
import registerHandlebarsHelpers from "./helpers/handlebarsHelpers.ts";
import { router } from "./router/Router.ts";
import UserController from "./controllers/UserController.ts";
import ChatController from "./controllers/ChatController.ts";
import MessagesWSController from "./controllers/MessagesWSController.ts";
import store from "./store/Store.ts";

document.addEventListener("DOMContentLoaded", () => {
  registerHandlebarsHelpers();
  (async () => {
    try {
      const user = await UserController.getUser();
      if (user) {
        await ChatController.getChats();
        const savedChatId = localStorage.getItem("activeChat");
        if (savedChatId !== null) {
          store.set("activeChat", +savedChatId);
          await MessagesWSController.openChat(+savedChatId);
          await ChatController.getUsersOfChat(+savedChatId);
        }
      }
    } catch (e) {
      console.log("Ошибка сервера", e);
    }

    router.start();
  })().catch(console.error);
});
