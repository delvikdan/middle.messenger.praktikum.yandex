import Block from "@/framework/Block";
// import { validateLogin, validatePassword } from "@/helpers/validation";
import { Form } from "@/components/Form/Form";
import { Link } from "@/components/Link";
import { signin } from "@/api/auth";
import { router } from "@/router";

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
        console.log("Данные формы авторизации:", data);
        signin(data)
          .then((result) => {
            if (result.status === 200) {
              router.go("/messenger");
            } else if (result.status === 401) {
              form.setProps({ onSubmitError: "Неверный логин или пароль" });
            } else {
              form.setProps({
                onSubmitError: "Ошибка авторизации",
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
