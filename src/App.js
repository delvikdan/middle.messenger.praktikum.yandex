import Handlebars from "handlebars";
import * as Pages from "./pages";
import "./helpers/handlebarsHelpers.js";

// Register partials
import Button from "./components/Button.js";
import ErrorMessage from "./components/ErrorMessage.js";
import FormGroup from "./components/FormGroup.js";
import Link from "./components/Link.js";
import Input from "./components/Input.js";
import Footer from "./components/Footer.js";
import Header from "./components/Header.js";
import Avatar from "./components/Avatar.js";
import DisplayName from "./components/DisplayName.js";
import ChatListItem from "./components/ChatListItem.js";
import ChatMessage from "./components/ChatMessage.js";
import UserInfo from "./components/UserInfo.js";
import ChangeInfoForm from "./components/ChangeInfoForm.js";
import ChangePasswordForm from "./components/ChangePasswordForm.js";
import ErrorPage from "./components/ErrorPage.js";

import {
  mockChatListItems,
  mockChatSelected,
  mockUserData,
} from "./mocData.js";

Handlebars.registerPartial("Button", Button);
Handlebars.registerPartial("ErrorMessage", ErrorMessage);
Handlebars.registerPartial("FormGroup", FormGroup);
Handlebars.registerPartial("Link", Link);
Handlebars.registerPartial("Input", Input);
Handlebars.registerPartial("Footer", Footer);
Handlebars.registerPartial("Header", Header);
Handlebars.registerPartial("Avatar", Avatar);
Handlebars.registerPartial("DisplayName", DisplayName);
Handlebars.registerPartial("ChatListItem", ChatListItem);
Handlebars.registerPartial("ChatMessage", ChatMessage);
Handlebars.registerPartial("UserInfo", UserInfo);
Handlebars.registerPartial("ChangeInfoForm", ChangeInfoForm);
Handlebars.registerPartial("ChangePasswordForm", ChangePasswordForm);
Handlebars.registerPartial("ErrorPage", ErrorPage);

export default class App {
  constructor() {
    this.state = {
      currentPage: "signIn",
    };
    this.appElement = document.getElementById("app");
  }

  render() {
    let template;

    if (this.state.currentPage === "signIn") {
      template = Handlebars.compile(Pages.SignInPage);
      this.appElement.innerHTML = template({});
    }

    if (this.state.currentPage === "signUp") {
      template = Handlebars.compile(Pages.SignUpPage);
      this.appElement.innerHTML = template({});
    }

    if (this.state.currentPage === "chat") {
      template = Handlebars.compile(Pages.ChatPage);
      this.appElement.innerHTML = template({
        chatListItems: mockChatListItems,
        selectedChat: mockChatSelected,
      });
    }

    if (this.state.currentPage === "profile") {
      template = Handlebars.compile(Pages.ProfilePage);
      this.appElement.innerHTML = template({
        userData: mockUserData,
      });
    }

    if (this.state.currentPage === "changeProfile") {
      template = Handlebars.compile(Pages.ChangeProfilePage);
      this.appElement.innerHTML = template({
        userData: mockUserData,
      });
    }

    if (this.state.currentPage === "changePassword") {
      template = Handlebars.compile(Pages.ChangePasswordPage);
      this.appElement.innerHTML = template({
        userData: mockUserData,
      });
    }

    if (this.state.currentPage === "page404") {
      template = Handlebars.compile(Pages.Page404);
      this.appElement.innerHTML = template({});
    }

    if (this.state.currentPage === "page500") {
      template = Handlebars.compile(Pages.Page500);
      this.appElement.innerHTML = template({});
    }

    this.attachEventListeners();
  }

  attachEventListeners() {
    const navLinks = document.querySelectorAll(".link");

    navLinks.forEach((link) => {
      const isCurrent = this.state.currentPage === link.dataset.page;
      isCurrent
        ? link.classList.add("active")
        : link.classList.remove("active");
      link &&
        link.addEventListener("click", (e) => {
          e.preventDefault();
          this.switchPage(e.target.dataset.page);
        });
    });
  }

  switchPage(page) {
    this.state.currentPage = page;
    this.render();
  }
}
