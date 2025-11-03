import Block from "../framework/Block.ts";

export type TitleProps = {
  className: string;
  title: string;
};

export class Title extends Block {
  override render(): string {
    return `<h2 class="heading-secondary {{className}}">{{ title }}</h2>`;
  }
}
