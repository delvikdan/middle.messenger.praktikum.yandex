import { WSTransport } from "@/framework/WSTransport";
import store from "@/store/store";
import ChatController from "@/controllers/ChatController";

class MessagesWSController {
  private ws: WSTransport | null = null;

  public async openChat(chatId: number) {
    const userId = store.getState().user?.id;
    if (!userId) return;
    const token = await ChatController.getToken(chatId);
    this.ws?.close();
    this.ws = new WSTransport(chatId, userId, token);
    this.ws.connect();
    this.ws.onMessage((payload) => {
      const messages = Array.isArray(payload) ? payload.reverse() : [payload];
      const prev = store.getState().messages?.[chatId] ?? [];
      if (Array.isArray(payload)) {
        store.set(`messages.${chatId}`, messages);
      } else {
        store.set(`messages.${chatId}`, [...prev, payload]);
      }
    });
  }

  public sendMessage(content: string) {
    this.ws?.send(content, "message");
  }

  public close() {
    this.ws?.close();
    this.ws = null;
  }
}

export default new MessagesWSController();
