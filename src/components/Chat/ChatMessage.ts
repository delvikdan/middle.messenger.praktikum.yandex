import Block from "@/framework/Block";

export type ChatMessageProps = {
  author?: string;
  messageType: string;
  content: string;
  time: string;
  status?: string;
};

export class ChatMessage extends Block {
  constructor(props: ChatMessageProps) {
    super({ ...props });
  }

  override render(): string {
    return `
      <div class="chat-message chat-message--{{#if author}}companion{{else}}own{{/if}}">
        <div class="chat-message__content chat-message__content--{{#if (eq messageType "image")}}image{{else}}text{{/if}}">
          {{#if (eq messageType "image")}}
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
      </div>`;
  }
}
