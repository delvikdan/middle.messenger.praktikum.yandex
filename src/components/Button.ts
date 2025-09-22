import Block from "@/framework/Block";

export type ButtonProps = {
  text: string;
  onClick?: EventListener;
  className?: string;
  disabled?: boolean;
  typeAttr?: string;
};

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: (e: Event): void => {
          props.onClick?.(e);
        },
      },
    });
  }

  override render(): string {
    return `
      <button type="button" class="btn {{className}}"{{#if disabled}} disabled{{/if}}>
        {{{text}}}
      </button>`;
  }
}
