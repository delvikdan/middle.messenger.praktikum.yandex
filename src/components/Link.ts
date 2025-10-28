import Block from "../framework/Block.ts";

export type LinkProps = {
  href: string;
  text: string;
  onClick?: EventListener;
  className?: string;
  isActive?: boolean;
  title?: string;
  key?: string;
  isRouterLink?: boolean;
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
      <a href="{{href}}" title="{{title}}" class="{{class}}" {{#if isRouterLink}}data-router-link{{/if}}>
        {{text}}
      </a>`;
  }
}
