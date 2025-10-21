import Block from "@/framework/Block";
import isEqual from "@/helpers/isEqual";

import { Avatar } from "@/components/Avatar";
import { Input } from "@/components/Input";

export type AvatarUploaderProps = {
  avatar: string;
  altText: string;
  onUpload?: (formData: FormData) => Promise<boolean>;
};

export class AvatarUploader extends Block {
  constructor(props: AvatarUploaderProps) {
    const avatarComponent: Avatar = new Avatar({
      avatar: props.avatar,
      altText: props.altText,
    });

    const avatarInput: Input = new Input({
      id: "avatar-input",
      nameAttr: "avatar",
      typeAttr: "file",
      hidden: true,
      events: {
        change: (e: Event) => this.handleFileChange(e),
      },
    });

    super({ ...props, avatarComponent, avatarInput });
  }

  private handleFileChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    const file = input.files[0];
    const formData = new FormData();
    formData.append("avatar", file);
    const onUpload = this.props.onUpload;

    if (typeof onUpload === "function") {
      onUpload(formData)
        .then((success: boolean) => {
          if (success) {
            this.children.avatarComponent.setProps({
              avatar: this.props.avatar,
            });
          } else {
            alert("Ошибка загрузки аватара");
          }
        })
        .catch((err: unknown) => {
          console.error(err);
        });
    }
  }

  override componentDidUpdate(
    oldProps: AvatarUploaderProps,
    newProps: AvatarUploaderProps
  ): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.children.avatarComponent.setProps({
        avatar: newProps.avatar,
      });
    }
    return true;
  }

  override render(): string {
    return `
      <div class="avatar-uploader">
        {{{avatarComponent}}}
        {{{avatarInput}}}
        <label class="avatar-uploader__button" for="avatar-input"><span>Поменять аватар</span></label>
      </div>`;
  }
}
