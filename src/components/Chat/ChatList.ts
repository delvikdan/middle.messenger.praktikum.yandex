import Block from "@/framework/Block";
import { ChatType } from "@/types/chat";
import store from "@/store/store";
import MessagesWSController from "@/controllers/MessagesWSController";
import ChatController from "@/controllers/ChatController";

import ChatListItem from "@/components/Chat/ChatListItem";

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
