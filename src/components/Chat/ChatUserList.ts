import Block from "../../framework/Block.ts";
import { ChatUserType } from "../../types/user.ts";
import isEqual from "../../helpers/isEqual.ts";

import { ChatUserListItem } from "./ChatUserListItem.ts";

type ChatUserListProps = {
  users: ChatUserType[];
  chatId: number;
  currentUserId: number;
  isCurrentUserAdmin: boolean;
};

export class ChatUserList extends Block {
  constructor(props: ChatUserListProps) {
    const { users, chatId, currentUserId, isCurrentUserAdmin } = props;

    const items = (users ?? []).map(
      (user) =>
        new ChatUserListItem({
          user,
          chatId,
          currentUserId,
          isCurrentUserAdmin,
        })
    );

    super({ ...props, items });
  }

  override componentDidUpdate(
    oldProps: ChatUserListProps,
    newProps: ChatUserListProps
  ): boolean {
    if (!isEqual(oldProps.users, newProps.users)) {
      const items = (newProps.users ?? []).map(
        (user) =>
          new ChatUserListItem({
            user,
            chatId: newProps.chatId,
            currentUserId: newProps.currentUserId,
            isCurrentUserAdmin: newProps.isCurrentUserAdmin,
          })
      );
      this.setLists({ items });
    }
    return true;
  }

  render() {
    return `
    <ul class="chat-user-list">
      {{{items}}}
    </ul>
    `;
  }
}
