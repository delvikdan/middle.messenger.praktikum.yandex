import Block from "@/framework/Block";
import { Avatar, type AvatarProps } from "@/components/Avatar";
import { Input, type InputProps } from "@/components/Input";

export type ProfileAvatarInputProps = AvatarProps & InputProps;

export class ProfileAvatarInput extends Block {
  constructor(props: ProfileAvatarInputProps) {
    const { avatar, displayName } = props;
    const avatarComponent: Avatar = new Avatar({ avatar, displayName });
    const avatarInput: Input = new Input({
      ...props,
    });

    super({ avatar, avatarComponent, avatarInput });
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
