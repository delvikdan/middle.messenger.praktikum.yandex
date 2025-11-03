import Block from "../../framework/Block.ts";
import { connect } from "../../hoc/connect.ts";

import { Avatar } from "../Avatar.ts";

export type ChatListItemProps = {
  chatId: number;
  title: string;
  avatar: string;
  unreadCount: number;
  latestMessageContent?: string;
  latestMessageTime?: string;
  latestMessageAuthor?: string;
  selected?: boolean;
  onClick: EventListener;
};

export class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {
    const { avatar, title } = props;

    const avatarComponent: Avatar = new Avatar({
      avatar,
      altText: title,
    });

    super({
      ...props,
      avatarComponent,
      events: {
        click: (e: Event): void => {
          e.preventDefault();
          props.onClick?.(e);
        },
      },
    });
  }

  override render(): string {
    return `
      <li class="chat-list__item{{#if selected}} chat-list__item--selected{{/if}}">
        <a class="chat-list__link" href="#" role="button">
          <div class="chat-list__pic">
            {{{avatarComponent}}}
          </div>
          <div class="chat-list__content">
            <div class="chat-list__row">
              <h2 class="chat-list__name heading-secondary">{{title}}</h2>
              <div class="chat-list__date">

              {{#if latestMessageContent}}{{formatTime latestMessageTime}}{{/if}}
    
              </div>
            </div>
            <div class="chat-list__row">
              <div class="chat-list__latest">
                {{#if latestMessageContent}}
                  {{latestMessageAuthor}}: {{latestMessageContent}}
                {{else}}
                  Сообщений нет
                {{/if}}

              </div>
              <div class="chat-list__unread">
                {{#unless (eq unreadCount 0)}}
                  <span>{{unreadCount}}</span>
                {{/unless}}
              </div>
            </div>
          </div>
          <div class="chat-list__underlay"></div>
        </a>
      </li>`;
  }
}

export default connect(ChatListItem, (state, ownProps) => ({
  selected: state.activeChat === ownProps?.chatId,
}));
