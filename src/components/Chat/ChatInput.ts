import Block from "../../framework/Block.ts";
import { validateMessage } from "../../helpers/validation.ts";
import MessagesWSController from "../../controllers/MessagesWSController.ts";

import { Button } from "../Button.ts";
import { Input } from "../Input.ts";

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
      typeAttr: "submit",
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.sendMessage();
      },
    });

    const input: Input = new Input({
      className: "chat-input__field",
      id: "message",
      typeAttr: "text",
      nameAttr: "message",
      placeholder: "Сообщение",
      validateValue: validateMessage,
      events: {
        keydown: (event: KeyboardEvent) => {
          if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            this.sendMessage();
          }
        },
      },
    });

    super({ attachButton, input, sendButton });
    this.input = input;
  }

  sendMessage(): void {
    const error = this.input.validateValue();
    if (!error) {
      const value = this.input.getValue();
      if (value.trim() !== "") {
        MessagesWSController.sendMessage(value);
        this.input.setProps({
          value: "",
          className: "chat-input__field",
          placeholder: "Сообщение",
        });
      }
    } else {
      this.input.setProps({
        className: "chat-input__field chat-input__field--red",
        placeholder: error,
      });
    }
  }

  override componentDidMount() {
    // Вот этот обработчик избавляет от перезагрузки по Enter
    const form = this.getContent().querySelector(
      ".chat-input"
    ) as HTMLFormElement;
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.sendMessage();
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
