import "@/styles/main.scss";
import registerHandlebarsHelpers from "@/helpers/handlebarsHelpers";
import { router } from "@/router";
import UserController from "@/controllers/UserController";
import ChatController from "@/controllers/ChatController";
import MessagesWSController from "@/controllers/MessagesWSController";
import store from "@/store/store";

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
