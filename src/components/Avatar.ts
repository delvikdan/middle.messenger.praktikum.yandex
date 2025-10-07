import Block from "@/framework/Block";

export type AvatarProps = {
  avatar: string;
  displayName: string;
};

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super({ ...props });
  }

  override render(): string {
    return `<img class="avatar" src="{{avatar}}" alt="{{displayName}}">`;
  }
}
