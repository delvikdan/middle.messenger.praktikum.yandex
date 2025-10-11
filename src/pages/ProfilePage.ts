import Block from "@/framework/Block";
import { connect } from "@/hoc/connect";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from "@/helpers/validation";
import { PasswordType, SignUpType, UserType } from "@/types/user";
import UserController from "@/controllers/UserController";

import DisplayName from "@/components/DisplayName";
import { Link } from "@/components/Link";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { ProfileAvatarInput } from "@/components/Profile/ProfileAvatarInput";
import { ProfileActions } from "@/components/Profile/ProfileActions";
import { Form } from "@/components/Form/Form";
import { router } from "@/router";

class ProfilePage extends Block {
  constructor(props: UserType) {
    const {
      email,
      login,
      first_name: firstName,
      second_name: secondName,
      phone,
      avatar,
    } = props;

    const displayName = `${firstName} ${secondName}`;

    const returnToChat: Link = new Link({
      href: "/messenger",
      text: "назад",
      className: "link navigation-bar__link btn-arrow",
      isRouterLink: true,
    });

    const returnToProfile: Link = new Link({
      href: "/settings",
      text: "назад",
      className: "link navigation-bar__link btn-arrow",
      isRouterLink: true,
    });

    const avatarInput: ProfileAvatarInput = new ProfileAvatarInput({
      avatar,
      displayName,
      typeAttr: "file",
      id: "avatar-input",
      nameAttr: "avatar",
      hidden: true,
    });

    const displayNameComponent: Block = new DisplayName({
      displayName,
      className: "profile__name",
    });

    const userInfo: ProfileInfo = new ProfileInfo({
      email,
      login,
      firstName,
      secondName,
      phone,
    });
    const actions: ProfileActions = new ProfileActions({
      onEditProfileClick: () => this.handleEditProfileClick(),
      onChangePasswordClick: () => this.handleChangePasswordClick(),
    });

    const profileForm: Form = new Form({
      className: "profile-form",
      formRowsData: [
        {
          label: "Почта",
          id: "email",
          typeAttr: "email",
          nameAttr: "email",
          validateValue: validateEmail,
          value: email,
        },
        {
          label: "Логин",
          id: "login",
          typeAttr: "text",
          nameAttr: "login",
          validateValue: validateLogin,
          value: login,
        },
        {
          label: "Имя",
          id: "first_name",
          typeAttr: "text",
          nameAttr: "first_name",
          validateValue: validateName,
          value: firstName,
        },
        {
          label: "Фамилия",
          id: "second_name",
          typeAttr: "text",
          nameAttr: "second_name",
          validateValue: validateName,
          value: secondName,
        },
        {
          label: "Телефон",
          id: "phone",
          typeAttr: "tel",
          nameAttr: "phone",
          validateValue: validatePhone,
          value: phone,
        },
      ],
      buttonData: {
        text: "Сохранить",
      },

      onSubmit: async (data: SignUpType) => {
        profileForm.setProps({ onSubmitError: "" });
        const result = await UserController.changeProfile(data);

        if (result.status === 200) {
          router.go("/settings");
        } else {
          profileForm.setProps({ onSubmitError: result.reason });
        }
      },
    });

    const passwordForm: Form = new Form({
      className: "profile-form",
      formRowsData: [
        {
          label: "Старый пароль",
          id: "oldPassword",
          typeAttr: "password",
          nameAttr: "oldPassword",
          validateValue: validatePassword,
          value: "",
        },
        {
          label: "Новый пароль",
          id: "newPassword",
          typeAttr: "password",
          nameAttr: "newPassword",
          validateValue: validatePassword,
        },
      ],

      buttonData: {
        text: "Сохранить",
      },

      onSubmit: async (data: PasswordType) => {
        passwordForm.setProps({ onSubmitError: "" });
        const result = await UserController.changePassword(data);

        if (result.status === 200) {
          router.go("/settings");
        } else {
          passwordForm.setProps({ onSubmitError: result.reason });
        }
      },
    });

    super({
      formMode: "none",
      returnToProfile,
      returnToChat,
      avatarInput,
      displayNameComponent,
      actions,
      userInfo,
      profileForm,
      passwordForm,
    });
  }

  handleEditProfileClick = (): void => {
    this.setProps({
      formMode: "profile",
    });
  };

  handleChangePasswordClick = (): void => {
    this.setProps({
      formMode: "password",
    });
  };

  override componentDidUpdate(oldProps: UserType, newProps: UserType): boolean {
    if (oldProps.avatar !== newProps.avatar) {
      this.children.avatarInput = new ProfileAvatarInput({
        avatar: newProps.avatar,
        displayName: `${newProps.first_name} ${newProps.second_name}`,
        id: "avatar-input",
        typeAttr: "file",
        nameAttr: "avatar",
        hidden: true,
      });
      this.render();
    }
    return true;
  }

  override render(): string {
    return `
      <div class="page-wrapper">
        <aside class="navigation-bar">
        {{#if (eq formMode "none")}}
          {{{returnToChat}}}
        {{else}}
          {{{returnToProfile}}}
        {{/if}}
        </aside>
        <main class="profile">
          <section class="profile__header">
             {{{avatarInput}}}
             {{{displayNameComponent}}}
          </section>

          <section class="profile__container">
            {{#if (eq formMode "profile")}}
              {{{profileForm}}}
            {{else if (eq formMode "password")}}
              {{{passwordForm}}}
            {{else}}
              {{{userInfo}}}
            {{/if}}
          </section>

          {{#if (eq formMode "none")}}
            <nav class="profile__actions">
              {{{actions}}}
            </nav>
          {{/if}}
        </main>
      </div>`;
  }
}

export default connect(ProfilePage, (state) => ({
  ...state.user,
}));
