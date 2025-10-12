import * as ChatAPI from "@/api/chat";
import store from "@/store";

class ChatController {
  public async getChats() {
    try {
      const chatList = await ChatAPI.getChats();
      store.set("chats", chatList);
      return chatList;
    } catch (e) {
      store.set("chats", []);
      throw e;
    }
  }

  // async createChat(data) { ... }
  // async addUserToChat(chatId, userId) { ... }
  // и т.д.
}
export default new ChatController();
