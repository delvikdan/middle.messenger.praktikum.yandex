export default `
  <div class="chat-message chat-message--{{#if author}}companion{{else}}own{{/if}}">
    <div class="chat-message__content chat-message__content--{{#if (eq type "image")}}image{{else}}text{{/if}}">
      {{#if (eq type "image")}}
        <img src="{{content}}" alt="Изображение"/>
        {{else}}
        {{content}}
      {{/if}}
      <div class="chat-message__meta">
      {{#unless author}}
        <span class="chat-message__status--{{status}}"> </span>
        {{/unless}}
        <span class="chat-message__time">{{time}}</span>
      </div>
    </div>
  </div>
  `;
