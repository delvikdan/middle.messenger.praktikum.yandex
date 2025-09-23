import Block from "@/framework/Block";
import { mockChatListItems } from "@/mockData";
import {
  ChatListItem,
  type ChatListItemProps,
} from "@/components/Chat/ChatListItem";

export class ChatList extends Block {
  constructor(props = mockChatListItems) {
    const chatListItems: ChatListItem[] = props.map(
      (item: ChatListItemProps) => new ChatListItem(item)
    );

    super({ chatListItems });
  }

  override render(): string {
    return `
      <ul class="chat-list">
          {{{chatListItems}}}
      </ul>`;
  }
}
