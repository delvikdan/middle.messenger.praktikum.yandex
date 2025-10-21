import * as ChatAPI from "@/api/chat";
import store from "@/store/store";
import UserController from "./UserController";

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

  public async createChat(data: { title: string }) {
    const res = await ChatAPI.createChat(data);
    if (res.status === 200) {
      // Получить обновлённый список чатов
      const chats = await this.getChats();
      if (Array.isArray(chats) && chats.length) {
        const lastChat = chats[0];
        store.set("activeChat", lastChat.id);
      }
    }
    return res;
  }

  public async getToken(chatId: number): Promise<string> {
    const res = await ChatAPI.getToken(chatId);
    return res.token;
  }

  public async changeAvatar(form: FormData) {
    try {
      const res = await ChatAPI.changeChatAvatar(form);
      if (res.status === 200) {
        await this.getChats();
        return true;
      } else {
        const resp = res.response || res.responseText;
        throw new Error(resp);
      }
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public async deleteChat(chatId: number) {
    try {
      const res = await ChatAPI.deleteChat(chatId);
      if (res.status === 200) {
        await this.getChats();
        if (store.getState().activeChat === chatId) {
          store.set("activeChat", null);
          localStorage.removeItem("activeChat");
          store.set(`chatUsers.${chatId}`, []);
        }
        return true;
      } else {
        throw new Error("Failed to delete chat");
      }
    } catch (e) {
      console.error("Ошибка удаления чата", e);
      return false;
    }
  }

  public async getUsersOfChat(chatId: number) {
    try {
      const users = await ChatAPI.getUsersOfChat(chatId);
      store.set(`chatUsers.${chatId}`, users);
      return users;
    } catch (e) {
      console.error("Ошибка получения пользователей чата", e);
      store.set(`chatUsers.${chatId}`, []);
      return [];
    }
  }

  public async deleteChatUser(chatId: number, userId: number) {
    try {
      const res = await ChatAPI.deleteChatUser({
        users: [userId],
        chatId,
      });
      if (res.status === 200) {
        await this.getUsersOfChat(chatId);
        return true;
      } else {
        throw new Error(
          res.response || "Не удалось удалить пользователя из чата"
        );
      }
    } catch (e) {
      console.error("Ошибка удаления пользователя:", e);
      return false;
    }
  }

  private async addUsersToChat(chatId: number, userIds: number[]) {
    try {
      const res = await ChatAPI.addUsers({ users: userIds, chatId });
      if (res.status == 200) {
        await this.getUsersOfChat(chatId);
      } else {
        throw new Error(
          res.error || "Не удалось добавить пользователя(ей) в чат"
        );
      }
    } catch (error) {
      console.error("Ошибка при добавлении пользователя в чат:", error);
      throw error;
    }
  }

  public async addUserByLogin(login: string) {
    const selectedChatId = store.getState().activeChat;
    if (!selectedChatId) {
      throw new Error("Чат не выбран");
    }
    const userIds = await UserController.findUser(login);
    if (userIds.length === 0) {
      throw new Error("Логин не найден");
    }
    try {
      await this.addUsersToChat(selectedChatId, userIds);
      await this.getUsersOfChat(selectedChatId);
    } catch (error) {
      throw error;
    }
  }
}
export default new ChatController();
