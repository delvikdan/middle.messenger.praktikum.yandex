import Block from "../../framework/Block.ts";
import { ChatUserType } from "../../types/user.ts";
import ChatController from "../../controllers/ChatController.ts";

import { Link } from "../Link.ts";
import { Avatar } from "../Avatar.ts";

type ChatUserListItemProps = {
  user: ChatUserType;
  chatId: number;
  currentUserId: number;
  isCurrentUserAdmin: boolean;
};

export class ChatUserListItem extends Block {
  constructor(props: ChatUserListItemProps) {
    const { user } = props;

    const chatUserAvatar = new Avatar({
      avatar: user.avatar,
      altText: user.first_name,
    });

    const deleteBtn = new Link({
      text: "удалить",
      className: "link chat-user-list__delete",
      href: "#",
      onClick: (e: Event) => {
        e.preventDefault();
        ChatController.deleteChatUser(props.chatId, props.user.id).catch(
          console.error
        );
      },
    });

    super({ ...props, deleteBtn, chatUserAvatar });
  }

  render() {
    return `
      <li id="user-{{chatId}}-{{user.id}}" class="chat-user-list__item">
        <div class="chat-user-list__user">
          <div class="chat-user-list__avatar">
            {{{chatUserAvatar}}}
          </div>
          <div class="chat-user-list__name">
            {{user.first_name}}  
            {{#if (eq user.id currentUserId)}}(Вы){{/if}}
          </div>
        </div>
     
        {{#if (and isCurrentUserAdmin (ne user.id currentUserId) (eq user.role "regular"))}}
          {{{deleteBtn}}}
        {{/if}}

        {{#if (eq user.role "admin")}}
          Admin
        {{/if}}    
      </li>
    `;
  }
}
