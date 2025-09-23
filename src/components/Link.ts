import Block from "@/framework/Block";

export type LinkProps = {
  href: string;
  text: string;
  onClick?: EventListener;
  className?: string;
  isActive?: boolean;
  title?: string;
  key?: string;
  datapage?: string;
};

export class Link extends Block {
  constructor(props: LinkProps) {
    super({
      ...props,
      class: (props.className || "") + (props.isActive ? " active" : ""),
      events: {
        click: (e: MouseEvent): void => {
          props.onClick?.(e);
        },
      },
    });
  }

  override render(): string {
    return `
      <a href="{{href}}" title="{{title}}" class="{{class}}" data-page="{{datapage}}">
        {{text}}
      </a>`;
  }
}
