import Block from "@/framework/Block";
import {
  validateLogin,
  validatePassword,
  validateName,
  validateEmail,
  validatePhone,
} from "@/helpers/validation";
import { Form } from "@/components/Form/Form";
import { Link } from "@/components/Link";

const formData = [
  {
    label: "Почта",
    id: "email",
    typeAttr: "email",
    nameAttr: "email",
    validateValue: validateEmail,
  },
  {
    label: "Логин",
    id: "login",
    typeAttr: "text",
    nameAttr: "login",
    validateValue: validateLogin,
  },
  {
    label: "Имя",
    id: "first_name",
    typeAttr: "text",
    nameAttr: "first_name",
    validateValue: validateName,
  },
  {
    label: "Фамилия",
    id: "second_name",
    typeAttr: "text",
    nameAttr: "second_name",
    validateValue: validateName,
  },
  {
    label: "Телефон",
    id: "phone",
    typeAttr: "tel",
    nameAttr: "phone",
    validateValue: validatePhone,
  },
  {
    label: "Пароль",
    id: "password",
    typeAttr: "password",
    nameAttr: "password",
    validateValue: validatePassword,
  },
];

export class SignUpPage extends Block {
  constructor() {
    const form: Form = new Form({
      className: "login-form",
      formRowsData: formData,
      buttonData: {
        text: "Зарегистрироваться",
      },
    });

    const link: Link = new Link({
      text: "Войти",
      href: "/",
      className: "link link--small",
      isRouterLink: true,
    });

    super({ form, link });
  }

  override render(): string {
    return `
      <main class="main">
        <div class="sign-page sign-page--up">
          <h1 class="heading-primary">Регистрация</h1>
          {{{form}}}
          {{{link}}}
        </div>
      </main>`;
  }
}
