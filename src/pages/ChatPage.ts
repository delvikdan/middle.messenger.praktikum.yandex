import Block from "../framework/Block.ts";

import ChatMain from "../components/Chat/ChatMain.ts";
import ChatSidebar from "../components/Chat/ChatSidebar.ts";

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
