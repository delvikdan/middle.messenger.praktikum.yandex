import Block from "../../framework/Block.ts";

import { Input, type InputProps } from "../Input.ts";

export type FormRowProps = InputProps & {
  className?: string;
  label: string;
  error?: string;
};

export class FormRow extends Block {
  input: Input;

  key: string;

  constructor(props: FormRowProps) {
    const input: Input = new Input({
      ...props,
      className: `${props.className}__input`,
      events: {
        blur: (): string | null => this.showError(),
      },
    });

    super({ ...props, input });

    this.input = input;
    this.key = props.nameAttr;
  }

  showError(): string | null {
    const errorMsg: string | null = this.input.validateValue();
    this.setProps({ error: errorMsg });
    return errorMsg;
  }

  override render(): string {
    return `
      <div class="{{className}}__row">
        <div>
          {{{input}}}
          <label for="{{id}}" class="{{className}}__label">{{label}}</label>
        </div>
          {{#if error}}
          <p class="{{className}}__error">{{error}}</p>
        {{/if}}
      </div>`;
  }
}
