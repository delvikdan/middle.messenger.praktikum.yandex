import Block from "@/framework/Block";
import { connect } from "@/hoc/connect";
import { ChatType } from "@/types/chat";

import { ChatListItem } from "@/components/Chat/ChatListItem";

type ChatListProps = {
  chats: ChatType[];
};

class ChatList extends Block {
  constructor(props: ChatListProps) {
    const chatListItems: ChatListItem[] = props.chats.map((item: ChatType) => {
      const {
        title,
        avatar,
        unread_count: unreadCount,
        last_message: lastMsg,
      } = item;

      return new ChatListItem({
        title,
        avatar,
        unreadCount,
        latestMessageContent: lastMsg?.content || "",
        latestMessageTime: lastMsg?.time || "",
        latestMessageAuthor: lastMsg?.user?.first_name || "",
      });
    });

    super({ chatListItems });
  }

  override render(): string {
    return `
      <ul class="chat-list">
          {{{chatListItems}}}
      </ul>`;
  }
}

export default connect(ChatList, (state) => ({
  chats: state.chats || [],
}));
