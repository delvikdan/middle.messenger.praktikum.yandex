import Block from "@/framework/Block";
// import { validateLogin, validatePassword } from "@/helpers/validation";
import { signin } from "@/api/auth";
import { router } from "@/router";
import { Form } from "@/components/Form/Form";
import { Link } from "@/components/Link";
import { LoggedInStore } from "@/store/loggedIn";

const formData = [
  {
    label: "Логин",
    id: "login",
    typeAttr: "text",
    nameAttr: "login",
  },
  {
    label: "Пароль",
    id: "password",
    typeAttr: "password",
    nameAttr: "password",
  },
];

export class SignInPage extends Block {
  constructor() {
    const form: Form = new Form({
      className: "login-form",
      formRowsData: formData,
      buttonData: {
        text: "Авторизоваться",
      },
      onSubmit: (data: { login: string; password: string }) => {
        signin(data)
          .then((result) => {
            if (result.status === 200) {
              LoggedInStore.setLoggedIn(true);
              router.go("/messenger");
            } else {
              form.setProps({
                onSubmitError: result.reason,
              });
            }
          })
          .catch((e) => {
            this.setProps({ onSubmitError: "Ошибка сети" });
            console.error("Ошибка signin:", e);
          });
      },
    });

    const link: Link = new Link({
      text: "Нет аккаунта?",
      href: "/sign-up",
      className: "link link--small",
      isRouterLink: true,
    });

    super({ form, link, onSubmitError: "" });
  }

  override render(): string {
    return `
      <main class="main">
        <div class="sign-page sign-page--in">
          <h1 class="heading-primary">Вход</h1>
          {{{form}}}
          {{{link}}}
        </div>
      </main>`;
  }
}
