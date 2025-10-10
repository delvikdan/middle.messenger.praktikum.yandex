import Block from "@/framework/Block";
import { connect } from "@/hoc/connect";
import { Avatar, type AvatarProps } from "@/components/Avatar";
import { Input, type InputProps } from "@/components/Input";
import UserController from "@/controllers/UserController";
import { API_URL } from "@/api/config";
import store from "@/store";

export type ProfileAvatarInputProps = AvatarProps & InputProps;

export class ProfileAvatarInput extends Block {
  constructor(props: ProfileAvatarInputProps) {
    const { avatar, displayName } = props;

    const avatarComponent: Avatar = new Avatar({
      avatar: `${API_URL}/resources${avatar}`,
      displayName,
    });
    const avatarInput: Input = new Input({
      ...props,
      typeAttr: "file",
      events: {
        change: (e: Event) => this.handleFileChange(e),
      },
    });

    super({ avatar, avatarComponent, avatarInput });
  }

  private handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    // Запускаем upload через UserController
    UserController.changeAvatar(formData)
      .then((success) => {
        if (success) {
          console.log("STORE AFTER AVATAR UPLOAD", store.getState());
          // Можно показать всплывающее уведомление "Аватар обновлён"
        } else {
          // Можно показать ошибку
          alert("Ошибка загрузки аватара");
          console.log("STORE AFTER AVATAR UPLOAD", store.getState());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  override render(): string {
    return `
      <div class="userpic">
        {{#if avatar}}
          {{{avatarComponent}}}
        {{/if}}
        {{{avatarInput}}}

        <label class="userpic__button" for="avatar-input"><span>Поменять аватар</span></label>
      </div>`;
  }
}

export default connect(ProfileAvatarInput, (state) => ({
  avatar: state.user?.avatar,
  displayName: state.user?.display_name || state.user?.first_name || "",
}));
