import Block from "../framework/Block.ts";
import { connect } from "../hoc/connect.ts";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from "../helpers/validation.ts";
import { PasswordType, SignUpType, UserType } from "../types/user.ts";
import UserController from "../controllers/UserController.ts";

import { Title } from "../components/Title.ts";
import { Link } from "../components/Link.ts";
import { ProfileInfo } from "../components/Profile/ProfileInfo.ts";
import { AvatarUploader } from "../components/AvatarUploader.ts";
import { ProfileActions } from "../components/Profile/ProfileActions.ts";
import { Form } from "../components/Form/Form.ts";
import { router } from "../router/index.ts";

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

    const userAvatarUploader: AvatarUploader = new AvatarUploader({
      avatar,
      altText: displayName,
      onUpload: (formData) => UserController.changeAvatar(formData),
    });

    const userDisplayName: Block = new Title({
      className: "profile__name",
      title: displayName,
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
      userAvatarUploader,
      userDisplayName,
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
      this.children.userAvatarUploader.setProps({
        avatar: newProps.avatar,
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
             {{{userAvatarUploader}}}
             {{{userDisplayName}}}
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
