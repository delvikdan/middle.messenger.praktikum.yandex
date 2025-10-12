import Block from "@/framework/Block";
import { Link } from "@/components/Link";
import { Input } from "@/components/Input";
import ChatList from "@/components/Chat/ChatList";

export class ChatSidebar extends Block {
  constructor() {
    const link: Link = new Link({
      text: "Профиль",
      href: "/settings",
      isRouterLink: true,
      className: "link link-profile link--grey",
    });

    const searhInput: Input = new Input({
      id: "search",
      typeAttr: "text",
      nameAttr: "search",
      className: "chat-sidebar__search-input",
      placeholder: "Поиск",
    });

    const chatList = new ChatList();

    super({ link, searhInput, chatList });
  }

  override render(): string {
    return `
    <aside class="chat-sidebar">

      <div class="chat-sidebar__header">
        <div class="chat-sidebar__profile-menu">
          {{{link}}}
        </div>
      </div>

      <div class="chat-sidebar__search">
        {{{searhInput}}}
      </div>
      <nav class="chat-sidebar__navigation">
         {{{chatList}}}

      </nav>
    </aside>`;
  }
}
