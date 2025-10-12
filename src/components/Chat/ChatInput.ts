import Block from "@/framework/Block";
import { validateMessage } from "@/helpers/validation";
import store from "@/store";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";

export class ChatInput extends Block {
  input: Input;

  constructor() {
    const attachButton: Button = new Button({
      text: '<img src="/images/icon-attach.svg" alt=""/>',
      className: "btn-attach",
    });

    const sendButton: Button = new Button({
      text: '<img src="/images/icon-arrow-right.svg" alt=""/>',
      className: "btn-arrow",
      typeAttr: "sumbit",
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.sendMessage();
        console.log(store.getState());
      },
    });

    const input: Input = new Input({
      className: "chat-input__field",
      id: "message",
      typeAttr: "text",
      nameAttr: "message",
      placeholder: "Сообщение",
      validateValue: validateMessage,
    });

    super({ attachButton, input, sendButton });
    this.input = input;
  }

  sendMessage(): void {
    const error = this.input.validateValue();
    if (!error) {
      const value = this.input.getValue();
      console.log("[MESSAGE SENT]:", value);
      this.input.setProps({
        value: "",
        className: "chat-input__field",
        placeholder: "Сообщение",
      });
    } else {
      this.input.setProps({
        className: "chat-input__field chat-input__field--red",
        placeholder: error,
      });
    }
  }

  override render(): string {
    return `
      <form class="chat-input" autocomplete="off">
       {{{ attachButton }}}
       {{{ input }}}
       {{{ sendButton }}}
      </form>`;
  }
}
