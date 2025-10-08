import "@/styles/main.scss";
import "@/helpers/handlebarsHelpers";
import { router } from "@/router";
import store from "@/store";
import UserController from "@/controllers/UserController"; // должен уметь класть user в store

document.addEventListener("DOMContentLoaded", () => {
  (async () => {
    try {
      await UserController.getUser();
    } catch (e) {
      // handle
    }
    const { loggedIn } = store.getState();
    console.log("STORE", store.getState());
    if (loggedIn) {
      console.log("Пользователь есть:", loggedIn);
      // router.go("/messenger");
    } else {
      console.log("Пользователь НЕ авторизован");
      // router.go("/sign-in");
    }
    router.start();
  })().catch(console.error);
});
