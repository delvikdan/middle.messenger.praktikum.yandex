import Block from "@/framework/Block";
import { WSMessage } from "@/types/chat";

type ChatHistoryProps = {
  messages: WSMessage[];
  userId: number;
};

export class ChatHistory extends Block<ChatHistoryProps> {
  override render(): string {
    return `
      <section class="chat-history">
        <div class="chat-history__period">
          19 июня
        </div>
        
        {{#each messages}}
          <div class="chat-message chat-message--{{#if (eq user_id ../userId)}}own{{else}}companion{{/if}}">
            <div class="chat-message__content chat-message__content--{{#if (eq type "image")}}image{{else}}text{{/if}}">
              {{#if (eq type "image")}}
                <img src="{{content}}" alt="Изображение"/>
              {{else}}
                {{content}}
              {{/if}}
              <div class="chat-message__meta">
                {{#if (eq user_id ../userId)}}
                  {{#if is_read}}<span class="chat-message__status--read"> </span>{{/if}}
                {{/if}}
                <span class="chat-message__time">{{formatTime time}}</span>
              </div>
            </div>
          </div>
        {{/each}}
      </section>
    `;
  }
}
