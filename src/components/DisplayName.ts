import Block from "@/framework/Block";

export type DisplayNameProps = {
  className: string;
  displayName: string;
};

export class DisplayName extends Block {
  constructor(props: DisplayNameProps) {
    super({ ...props });
  }

  override render(): string {
    return `<h2 class="heading-secondary {{className}}">{{ displayName }}</h2>`;
  }
}
