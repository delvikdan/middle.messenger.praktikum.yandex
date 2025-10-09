import Block from "@/framework/Block";
import { connect } from "@/hoc/connect";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from "@/helpers/validation";
import { UserType } from "@/types/user";

import { Link } from "@/components/Link";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { DisplayName } from "@/components/DisplayName";
import { ProfileAvatarInput } from "@/components/Profile/ProfileAvatarInput";
import { ProfileActions } from "@/components/Profile/ProfileActions";
import { Form } from "@/components/Form/Form";

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
      id: "avatar-input",
      typeAttr: "file",
      nameAttr: "avatar",
      hidden: true,
    });
    const displayNameComponent: DisplayName = new DisplayName({
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
