import "@/styles/main.scss";
import "@/helpers/handlebarsHelpers";
import { router } from "@/router";
import UserController from "@/controllers/UserController";

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    try {
      // пробуем авторизоваться по куке/токену, если есть
      await UserController.getUser();
    } catch (e) {
      console.log("Ошибка сервера", e);
    }
    router.start(); // запускаем роутер
  })().catch(console.error);
});
