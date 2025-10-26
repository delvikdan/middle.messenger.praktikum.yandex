import Block from "@/framework/Block";

import ChatMain from "@/components/Chat/ChatMain";
import ChatSidebar from "@/components/Chat/ChatSidebar";

export class ChatPage extends Block {
  constructor() {
    const sidebar = new ChatSidebar();
    const main = new ChatMain();

    super({ sidebar, main });
  }

  override render(): string {
    return `
    <div class="chat page-wrapper">
      {{{sidebar}}}
      {{{main}}}
    </div>`;
  }
}
