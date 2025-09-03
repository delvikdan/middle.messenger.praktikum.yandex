export default `
  <li class="chat-list__item{{#if selected}} chat-list__item--selected{{/if}}">
    <a class="chat-list__link" href="#" role="button">
      <div class="chat-list__pic">
        {{#if avatar}}
          {{> Avatar}}
        {{/if}}
      </div>
      <div class="chat-list__content">
        <div class="chat-list__row">
          {{> DisplayName class="chat-list__name"}}
          <div class="chat-list__date">{{latestMessageDate}}</div>
        </div>
        <div class="chat-list__row">
          <div class="chat-list__latest">{{{latestMessage}}}</div>
          <div class="chat-list__unread">
            {{#if unreadCount}}
                <span>{{unreadCount}}</span>
            {{/if}}
          </div>
        </div>
      </div>
      <div class="chat-list__underlay"></div>
    </a>
  </li>
`;
