import Block from "@/framework/Block";
import { ChatMessage, ChatMessageProps } from "@/components/Chat/ChatMessage";

export type ChatHistoryProps = {
  period: string;
  messages: ChatMessageProps[];
};

export class ChatHistory extends Block {
  constructor(props: ChatHistoryProps) {
    const { period, messages } = props;
    const chatmessages: ChatMessage[] = messages.map(
      (message: ChatMessageProps) => new ChatMessage(message)
    );

    super({ period, chatmessages });
  }

  override render(): string {
    return `
      <section class="chat-history">
        <div class="chat-history__period">
          {{{period}}}
        </div>
          {{{chatmessages}}}
      </section>`;
  }
}
