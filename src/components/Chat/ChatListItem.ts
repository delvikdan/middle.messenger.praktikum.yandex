import Block from "@/framework/Block";
import { Avatar } from "@/components/Avatar";

// {
//     id: number;
//     title: string;
//     avatar: string;
//     unread_count: number;
//     created_by: number;
//     last_message: {
//         user: UserType;
//         time: string;
//         content: string;
//     };
// }

export type ChatListItemProps = {
  title: string;
  avatar: string;
  unreadCount: number;
  latestMessageContent?: string;
  latestMessageTime?: string;
  latestMessageAuthor?: string;
  selected?: boolean;
};

export class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {
    const { avatar, title } = props;

    const avatarComponent: Avatar = new Avatar({
      avatar,
      displayName: title,
    });

    super({ ...props, avatarComponent });
  }

  override render(): string {
    return `
      <li class="chat-list__item{{#if selected}} chat-list__item--selected{{/if}}">
        <a class="chat-list__link" href="#" role="button">
          <div class="chat-list__pic">
            {{#if avatar}}
              {{{avatarComponent}}}
            {{/if}}
          </div>
          <div class="chat-list__content">
            <div class="chat-list__row">
              <h2 class="chat-list__name heading-secondary">{{title}}</h2>
              <div class="chat-list__date">{{latestMessageTime}}</div>
            </div>
            <div class="chat-list__row">
              <div class="chat-list__latest">{{latestMessageAuthor}}: {{latestMessageContent}}</div>
              <div class="chat-list__unread">
                {{#if unreadCount}}
                    <span>{{unreadCount}}</span>
                {{/if}}
              </div>
            </div>
          </div>
          <div class="chat-list__underlay"></div>
        </a>
      </li>`;
  }
}
