import Block from "../../framework/Block.ts";
import { Button } from "../Button.ts";
import { connect } from "../../hoc/connect.ts";
import ChatController from "../../controllers/ChatController.ts";
import { ChatType } from "../../types/chat.ts";
import isEqual from "../../helpers/isEqual.ts";

import { Input } from "../Input.ts";
import { ChatList } from "./ChatList.ts";
import { Link } from "../Link.ts";

type ChatSidebarProps = {
  chats: ChatType[];
  isAddMode: boolean;
};

export class ChatSidebar extends Block {
  chatListItems: "ChatListItem[]";

  constructor(props: ChatSidebarProps) {
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

    const createChatBtn = new Button({
      text: "Создать чат",
      className: "btn-text",
      onClick: () =>
        this.setProps({
          isAddMode: true,
        }),
      disabled: false,
      typeAttr: "button",
    });

    const addChatAction = new Link({
      href: "#",
      text: "Добавить",
      className: "link",
      onClick: (e: Event) => {
        e.preventDefault();
        const chatName = chatNameInput.getValue?.() ?? "";
        if (!chatName.trim()) {
          alert("Введите название чата");
          return;
        }
        ChatController.createChat({ title: chatName })
          .then(() => {
            chatNameInput.setProps({ value: "" });
            this.setProps({ isAddMode: false });
          })
          .catch(console.error);
      },
    });

    const cancelAddingChatAction = new Link({
      href: "#",
      text: "Отмена",
      className: "link link--red",
      onClick: (e: Event) => {
        e.preventDefault();
        this.setProps({ isAddMode: false });
      },
    });
    const chatList = new ChatList({ chats: props.chats });
    super({
      ...props,
      link,
      chatNameInput,
      chatList,
      createChatBtn,
      addChatAction,
      cancelAddingChatAction,
    });
  }

  override componentDidUpdate(
    oldProps: ChatSidebarProps,
    newProps: ChatSidebarProps
  ): boolean {
    this.children.createChatBtn.setProps({
      disabled: newProps.isAddMode,
    });
    if (!isEqual(oldProps.chats, newProps.chats)) {
      this.children.chatList = new ChatList({ chats: newProps.chats });
    }
    return true;
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
        {{#if isAddMode}}
        <div class="chat-sidebar__add-chat-wrapper activated">
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
        {{/if}}
      </div>
      <nav class="chat-sidebar__navigation">
        {{{chatList}}}
      </nav>
    </aside>`;
  }
}

export default connect(ChatSidebar, (state) => ({
  chats: state.chats || [],
  isAddMode: false,
}));
