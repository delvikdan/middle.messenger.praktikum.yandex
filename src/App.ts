import { linksData } from "@/mockData";
import "@/helpers/handlebarsHelpers";
import {
  SignInPage,
  SignUpPage,
  ProfilePage,
  ChatPage,
  ErrorPage,
} from "@/pages/";
import { Footer } from "@/components/Footer";

export default class App {
  private state: Record<string, string>;

  private appElement: HTMLElement | null;

  constructor() {
    this.state = {
      currentPage: "signIn",
    };
    this.appElement = document.getElementById("app");
  }

  render(): string {
    let page:
      | SignInPage
      | SignUpPage
      | ChatPage
      | ProfilePage
      | ErrorPage
      | null = new ErrorPage({
      code: "404",
    });

    if (this.state.currentPage === "signIn") {
      page = new SignInPage();
    }

    if (this.state.currentPage === "signUp") {
      page = new SignUpPage();
    }

    if (this.state.currentPage === "chat") {
      page = new ChatPage();
    }

    if (this.state.currentPage === "profile") {
      page = new ProfilePage();
    }

    if (this.state.currentPage === "page404") {
      page = new ErrorPage({ code: "404" });
    }

    if (this.state.currentPage === "page500") {
      page = new ErrorPage({ code: "500" });
    }

    const footer = new Footer({
      linksData,
      activePage: this.state.currentPage,
    });

    this.appElement?.replaceChildren(page.getContent());
    this.appElement?.append(footer.getContent());
    this.attachEventListeners();

    return "";
  }

  attachEventListeners(): void {
    const navLinks = document.querySelectorAll<HTMLAnchorElement>(".link");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.dataset.page;
        if (page) {
          this.switchPage(page);
        }
      });
    });
  }

  switchPage(page: string): void {
    this.state.currentPage = page;
    this.render();
  }
}
