import "@/styles/main.scss";
import "@/helpers/handlebarsHelpers";
import { router } from "@/router";
import UserController from "@/controllers/UserController";
import ChatController from "@/controllers/ChatController";

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    try {
      await UserController.getUser();
      await ChatController.getChats();
    } catch (e) {
      console.log("Ошибка сервера", e);
    }
    router.start();
  })().catch(console.error);
});
