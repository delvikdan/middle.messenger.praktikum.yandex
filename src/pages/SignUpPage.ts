import Block from "../framework/Block.ts";
import {
  validateLogin,
  validatePassword,
  validateName,
  validateSecondName,
  validateEmail,
  validatePhone,
} from "../helpers/validation.ts";
import { router } from "../router/Router.ts";
import { SignUpType } from "../types/user.ts";
import { connect } from "../hoc/connect.ts";
import UserController from "../controllers/UserController.ts";
import ChatController from "../controllers/ChatController.ts";

import { Form } from "../components/Form/Form.ts";
import { Link } from "../components/Link.ts";

class SignUpPage extends Block {
  constructor(props: SignUpType) {
    const form: Form = new Form({
      className: "login-form",
      formRowsData: [
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
          validateValue: validateSecondName,
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
      ],
      buttonData: {
        text: "Зарегистрироваться",
      },

      onSubmit: async (data: SignUpType) => {
        form.setProps({ onSubmitError: "" });
        const result = await UserController.signup(data);

        if (result.status === 200) {
          await ChatController.getChats();
          router.go("/messenger");
        } else {
          form.setProps({ onSubmitError: result.reason });
        }
      },
    });

    const link: Link = new Link({
      text: "Войти",
      href: "/",
      className: "link link--small",
      isRouterLink: true,
    });

    super({ ...props, form, link, onSubmitError: "" });
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

export default connect(SignUpPage, (state) => ({
  user: state.user,
}));
