import "@/styles/main.scss";
import "@/helpers/handlebarsHelpers";

import {
  SignInPage,
  SignUpPage,
  ProfilePage,
  ChatPage,
  ErrorPage,
} from "@/pages";
import { Router } from "@/framework/Router";

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router("#app");
  router
    .use("/", SignInPage)
    .use("/sign-up", SignUpPage)
    .use("/settings", ProfilePage)
    .use("/messenger", ChatPage)
    .use("/404", ErrorPage)
    .start();
});
