import Block from "@/framework/Block";
import { router } from "@/router";
import store from "@/store";
import { SignInType } from "@/types/user";
import UserController from "@/controllers/UserController";
import { connect } from "@/hoc/connect";

import { Form } from "@/components/Form/Form";
import { Link } from "@/components/Link";

class SignInPage extends Block {
  constructor(props: SignInType) {
    const form: Form = new Form({
      className: "login-form",
      formRowsData: [
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
      ],
      buttonData: {
        text: "Авторизоваться",
      },
      onSubmit: async (data: SignInType) => {
        form.setProps({ onSubmitError: "" }); // очищаем старую ошибку
        const result = await UserController.signin(data);

        console.log(store.getState());

        if (result.status === 200) {
          router.go("/messenger");
        } else {
          form.setProps({ onSubmitError: result.reason });
        }
      },
    });

    const link: Link = new Link({
      text: "Нет аккаунта?",
      href: "/sign-up",
      className: "link link--small",
      isRouterLink: true,
    });

    super({ ...props, form, link, onSubmitError: "" });
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
export default connect(SignInPage, (state) => ({
  user: state.user,
}));
