import Block from "../../framework/Block.ts";
import { ChatType } from "../../types/chat.ts";
import store from "../../store/Store.ts";
import MessagesWSController from "../../controllers/MessagesWSController.ts";
import ChatController from "../../controllers/ChatController.ts";

import ChatListItem from "./ChatListItem.ts";

type ChatListProps = {
  chats: ChatType[];
};

export class ChatList extends Block {
  constructor(props: ChatListProps) {
    const chatListItems = props.chats.map((item: ChatType) => {
      const {
        id: chatId,
        title,
        avatar,
        unread_count: unreadCount,
        last_message: lastMsg,
      } = item;
      return new ChatListItem({
        chatId,
        title,
        avatar,
        unreadCount,
        latestMessageContent: lastMsg?.content || "",
        latestMessageTime: lastMsg?.time || "",
        latestMessageAuthor: lastMsg?.user?.first_name || "",
        onClick: () => this.handleChatClick(chatId),
      });
    });

    super({ chatListItems });
  }

  handleChatClick(chatId: number) {
    const userId = store.getState().user?.id;
    if (!userId) {
      alert("Требуется авторизация!");
      return;
    }
    const activeChat = store.getState().activeChat;
    if (activeChat === chatId) {
      return;
    }
    store.set("activeChat", chatId);
    localStorage.setItem("activeChat", String(chatId));
    MessagesWSController.openChat(chatId).catch((e) => {
      console.error(e);
    });
    ChatController.getUsersOfChat(chatId).catch((e) => {
      console.error(e);
    });
    // console.log(store.getState());
  }

  override render(): string {
    return `
      <ul class="chat-list">
          {{{chatListItems}}}
      </ul>`;
  }
}
