import Block from "@/framework/Block";
import { Avatar } from "@/components/Avatar";
import { DisplayName } from "@/components/DisplayName";

export type ChatListItemProps = {
  avatar: string;
  displayName: string;
  latestMessage: string;
  latestMessageDate: string;
  unreadCount?: string;
  selected?: boolean;
};

export class ChatListItem extends Block {
  constructor(props: ChatListItemProps) {
    const { avatar, displayName } = props;

    const avatarComponent: Avatar = new Avatar({
      avatar,
      displayName,
    });
    const displayNameComponent: DisplayName = new DisplayName({
      displayName,
      className: "chat-list__name",
    });
    super({ ...props, avatarComponent, displayNameComponent });
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
              {{{displayNameComponent}}}
              <div class="chat-list__date">{{{latestMessageDate}}}</div>
            </div>
            <div class="chat-list__row">
              <div class="chat-list__latest">{{{latestMessage}}}</div>
              <div class="chat-list__unread">
                {{#if unreadCount}}
                    <span>{{{unreadCount}}}</span>
                {{/if}}
              </div>
            </div>
          </div>
          <div class="chat-list__underlay"></div>
        </a>
      </li>`;
  }
}
