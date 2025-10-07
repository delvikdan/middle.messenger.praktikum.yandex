import Block from "@/framework/Block";

export type InputProps = {
  id: string;
  typeAttr: string;
  nameAttr: string;
  className?: string;
  value?: string;
  placeholder?: string;
  events?: Record<string, EventListener>;
  validateValue?: (value: string) => string | null;
  hidden?: boolean;
};

export class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
    });

    this.validateValue = (): string | null =>
      props.validateValue ? props.validateValue(this.getValue()) : null;
  }

  validateValue: () => string | null;

  getValue() {
    const el: HTMLElement = this.getContent();
    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLTextAreaElement ||
      el instanceof HTMLSelectElement
    ) {
      return el.value;
    }
    return "";
  }

  override render(): string {
    return `<input id="{{id}}" type="{{typeAttr}}" name="{{nameAttr}}" class="{{className}}" value="{{value}}" class="{{class}}" placeholder="{{placeholder}}"{{#if hidden}} hidden{{/if}}>`;
  }
}
