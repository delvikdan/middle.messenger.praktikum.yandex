import "@/styles/main.scss";
import "@/helpers/handlebarsHelpers";
import { router } from "@/router";
import { getUser } from "@/api/auth";
import { LoggedInStore } from "./store/loggedIn";

document.addEventListener("DOMContentLoaded", () => {
  getUser()
    .then((user) => {
      const isAuth = user && typeof user === "object" && "id" in user;
      LoggedInStore.setLoggedIn(isAuth);
      router.start();

      // Если юзер уже авторизован, можно сразу отправить на messenger
      if (isAuth && window.location.pathname === "/") {
        router.go("/messenger");
      }
    })
    .catch(() => {
      LoggedInStore.setLoggedIn(false);
      router.start();
    });
});
