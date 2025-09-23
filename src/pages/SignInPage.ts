import Block from "@/framework/Block";
import { validateLogin, validatePassword } from "@/helpers/validation";
import { Form } from "@/components/Form/Form";
import { Link } from "@/components/Link";

const formData = [
  {
    label: "Логин",
    id: "login",
    typeAttr: "text",
    nameAttr: "login",
    validateValue: validateLogin,
  },
  {
    label: "Пароль",
    id: "password",
    typeAttr: "password",
    nameAttr: "password",
    validateValue: validatePassword,
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
    });

    const link: Link = new Link({
      text: "Нет аккаунта?",
      href: "#",
      datapage: "signUp",
      className: "link link--small",
    });

    super({ form, link });
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
