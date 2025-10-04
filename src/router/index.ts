import { Router } from "@/router/Router";
import {
  SignInPage,
  SignUpPage,
  ProfilePage,
  ChatPage,
  ErrorPage,
} from "@/pages";

export const router = new Router("#app");

router
  .use("/", SignInPage)
  .use("/sign-up", SignUpPage)
  .use("/settings", ProfilePage)
  .use("/messenger", ChatPage)
  .use("/404", ErrorPage);
