import Block from "@/framework/Block";
import { mockUserData } from "@/mockData";
import { Link } from "@/components/Link";
import { ProfileInfo } from "@/components/Profile/ProfileInfo";
import { DisplayName } from "@/components/DisplayName";
import { ProfileAvatarInput } from "@/components/Profile/ProfileAvatarInput";
import { ProfileActions } from "@/components/Profile/ProfileActions";
import { Form } from "@/components/Form/Form";

import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePhone,
} from "@/helpers/validation";

const formData = [
  {
    label: "Почта",
    id: "email",
    typeAttr: "email",
    nameAttr: "email",
    validateValue: validateEmail,
    value: "pochta@yandex.ru",
  },
  {
    label: "Логин",
    id: "login",
    typeAttr: "text",
    nameAttr: "login",
    validateValue: validateLogin,
    value: "ivanivanov",
  },
  {
    label: "Имя",
    id: "first_name",
    typeAttr: "text",
    nameAttr: "first_name",
    validateValue: validateName,
    value: "Иван",
  },
  {
    label: "Фамилия",
    id: "second_name",
    typeAttr: "text",
    nameAttr: "second_name",
    validateValue: validateName,
    value: "Иванов",
  },
  {
    label: "Телефон",
    id: "phone",
    typeAttr: "tel",
    nameAttr: "phone",
    validateValue: validatePhone,
    value: "+79099673030",
  },
  {
    label: "Пароль",
    id: "password",
    typeAttr: "password",
    nameAttr: "password",
    validateValue: validatePassword,
    value: "Qwerty123",
  },
];

export class ProfilePage extends Block {
  constructor(props = mockUserData) {
    const { avatar, displayName }: { avatar: string; displayName: string } =
      props;
    const returnLink: Link = new Link({
      href: "#",
      text: "назад",
      className: "link navigation-bar__link btn-arrow",
      datapage: "chat",
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
      ...props,
    });
    const actions: ProfileActions = new ProfileActions({
      onEditClick: () => this.handleEditClick(),
    });

    const profileForm: Form = new Form({
      className: "profile-form",
      formRowsData: formData,
      buttonData: {
        text: "Сохранить",
      },
    });

    super({
      editing: false,
      returnLink,
      avatarInput,
      displayNameComponent,
      actions,
      userInfo,
      profileForm,
    });
  }

  handleEditClick = (): void => {
    this.setProps({
      editing: true,
    });
  };

  override render(): string {
    return `
      <div class="page-wrapper">
        <aside class="navigation-bar">
          {{{returnLink}}}
        </aside>
        <main class="profile">
          <section class="profile__header">
             {{{avatarInput}}}
             {{{displayNameComponent}}}
          </section>

          <section class="profile__container">
            {{#if editing}}
              {{{profileForm}}}
            {{else}}
              {{{userInfo}}}
            {{/if}}
          </section>

          {{#unless editing}}
            <nav class="profile__actions">
              {{{actions}}}
            </nav>
          {{/unless}}
        </main>
      </div>`;
  }
}
