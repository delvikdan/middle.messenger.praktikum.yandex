import Block from "@/framework/Block";
import { connect } from "@/hoc/connect";
import { ChatType, WSMessage } from "@/types/chat";
import isEqual from "@/helpers/isEqual";

import { Avatar } from "@/components/Avatar";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { ChatHistory } from "@/components/Chat/ChatHistory";
import { ChatInput } from "@/components/Chat/ChatInput";
import ChatOptions from "@/components/Chat/ChatOptions";

type ChatMainProps = {
  activeChatId: number;
  avatar: string;
  title: string;
  messages: WSMessage[];
  optionsOpened: boolean;
  userId: number;
};

export class ChatMain extends Block {
  constructor(props: ChatMainProps) {
    const { userId, avatar, title, messages } = props;

    const avatarComponent: Avatar = new Avatar({
      avatar,
      altText: title,
    });

    const chatHeaderTitle = new Title({
      className: "chat-main__name",
      title: props.title,
    });

    const menuButton: Button = new Button({
      className: "chat-main__menu-btn",
      text: "⋮",
      onClick: () =>
        this.setProps({ optionsOpened: !this.props.optionsOpened }),
    });

    const chatHistory: ChatHistory = new ChatHistory({ messages, userId });
    const chatInput: ChatInput = new ChatInput();

    const chatOptions = new ChatOptions({
      onClose: () => this.setProps({ optionsOpened: false }),
    });

    super({
      ...props,
      chatHeaderTitle,
      avatarComponent,
      menuButton,
      chatHistory,
      chatInput,
      chatOptions,
    });
  }

  override componentDidUpdate(
    oldProps: ChatMainProps,
    newProps: ChatMainProps
  ): boolean {
    if (oldProps.title !== newProps.title) {
      this.children.chatHeaderTitle.setProps({
        title: newProps.title,
      });
    }

    if (!isEqual(oldProps.messages, newProps.messages)) {
      this.children.chatHistory.setProps({
        messages: newProps.messages,
        userId: newProps.userId,
      });
    }

    if (
      oldProps.activeChatId !== newProps.activeChatId ||
      oldProps.avatar !== newProps.avatar ||
      oldProps.title !== newProps.title
    ) {
      this.children.avatarComponent.setProps({
        avatar: newProps.avatar,
        altText: newProps.title,
      });
    }

    return true;
  }

  override render(): string {
    return `
      <main id="{{activeChatId}}" class="chat-main">
      {{#if activeChatId}} 
        <header class="chat-main__header">
          <div class="chat-main__pic">
            {{{avatarComponent}}}
          </div>
            {{{chatHeaderTitle}}}
          <div class="chat-main__actions">
            {{{menuButton}}}
          </div>
          {{#if optionsOpened}}
          {{{chatOptions}}}
          {{/if}}
        </header>
          {{{chatHistory}}}
          {{{chatInput}}}
        {{else}}
        <span class="chat-main__empty">Выберите чат, чтобы отправить сообщение</span>
      {{/if}}
      </main>`;
  }
}

export default connect(ChatMain, (state) => {
  const userId = state.user?.id;
  const activeChatId = state.activeChat;
  const chats: ChatType[] = state.chats || [];
  const chatData =
    activeChatId != null
      ? chats.find((chat) => chat.id === activeChatId)
      : undefined;
  const messages =
    activeChatId && state.messages?.[activeChatId]
      ? state.messages[activeChatId]
      : [];
  return {
    activeChatId,
    avatar: chatData?.avatar,
    title: chatData?.title,
    messages,
    userId,
  };
});
