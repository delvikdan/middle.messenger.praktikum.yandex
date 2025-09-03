export default `
  <header class="chat-main__header">
    <div class="chat-main__pic">{{#if avatar}}{{> Avatar}}{{/if}}</div>
    {{> DisplayName class="chat-main__name"}}
    <div class="chat-main__actions">
     <button class="chat-main__menu-btn btn" aria-label="Меню чата">⋮</button>
    </div>
  </header>
`;
