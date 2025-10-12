import Block from "@/framework/Block";
import { mockChatSelected } from "@/mockData";
import { Avatar } from "@/components/Avatar";
import DisplayName from "@/components/DisplayName";
import { Button } from "@/components/Button";
import { ChatHistory } from "@/components/Chat/ChatHistory";
import { ChatInput } from "@/components/Chat/ChatInput";
import { type ChatMessageProps } from "@/components/Chat/ChatMessage";

export class ChatMain extends Block {
  constructor(props = mockChatSelected) {
    const {
      avatar,
      displayName,
      period,
      messages,
    }: {
      avatar: string;
      displayName: string;
      period: string;
      messages: ChatMessageProps[];
    } = props;
    const avatarComponent: Avatar = new Avatar({ avatar, displayName });
    const displayNameComponent = new DisplayName({
      className: "chat-main__name",
      displayName,
    });

    const menuButton: Button = new Button({
      className: "chat-main__menu-btn",
      text: "⋮",
    });

    const chatHistory: ChatHistory = new ChatHistory({ period, messages });
    const chatInput: ChatInput = new ChatInput();

    super({
      ...props,
      avatarComponent,
      displayNameComponent,
      menuButton,
      chatHistory,
      chatInput,
    });
  }

  override render(): string {
    return `
      <main class="chat-main">
        <header class="chat-main__header">
          <div class="chat-main__pic">
            {{#if avatar}}
             {{{avatarComponent}}}
            {{/if}}
          </div>
            {{{displayNameComponent}}}
          <div class="chat-main__actions">
            {{{menuButton}}}
          </div>
        </header>
        {{{chatHistory}}}
        {{{chatInput}}}
      </main>`;
  }
}
