import Block from "@/framework/Block";
import { Link } from "@/components/Link";
import { Input } from "@/components/Input";
import ChatList from "@/components/Chat/ChatList";
import { Button } from "../Button";

export class ChatSidebar extends Block {
  constructor() {
    const link: Link = new Link({
      text: "Профиль",
      href: "/settings",
      isRouterLink: true,
      className: "link link-profile link--grey",
    });

    const chatNameInput: Input = new Input({
      id: "nchat",
      typeAttr: "text",
      nameAttr: "nchat",
      className: "chat-sidebar__add-chat-input",
      placeholder: "Введите название",
    });

    const createChatBtn: Button = new Button({
      text: "Создать чат",
      className: "btn-text",
    });

    const addChatAction: Link = new Link({
      href: "#",
      text: "Добавить",
      className: "link",
    });
    const cancelAddingChatAction: Link = new Link({
      href: "#",
      text: "Отмена",
      className: "link link--red",
    });

    const chatList = new ChatList();

    super({
      link,
      chatNameInput,
      chatList,
      createChatBtn,
      addChatAction,
      cancelAddingChatAction,
    });
  }

  override render(): string {
    return `
    <aside class="chat-sidebar">

      <div class="chat-sidebar__header">
        <div class="chat-sidebar__profile-menu">
          {{{link}}}
        </div>
      </div>

      <div class="chat-sidebar__add-chat">

        {{{createChatBtn}}}
        

        <div class="chat-sidebar__add-chat-wrapper">
          {{{chatNameInput}}}
          <ul class="actions">
            <li class="actions__item">
              {{{addChatAction}}}
            </li>
            <li class="actions__item">
             {{{cancelAddingChatAction}}}
            </li>
          </ul>
        </div>

      </div>

  

      <nav class="chat-sidebar__navigation">
         {{{chatList}}}

      </nav>
    </aside>`;
  }
}
