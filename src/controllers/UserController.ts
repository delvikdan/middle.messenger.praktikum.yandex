// controllers/UserController.ts
import * as AuthAPI from "@/api/auth";
import * as UserAPI from "@/api/user";
import store from "@/store";
import { SignInType, SignUpType } from "@/types/user";

class UserController {
  // Auth
  public async getUser() {
    try {
      const user = await AuthAPI.getUser();
      const isUser = typeof user === "object" && user !== null && "id" in user;
      store.set("user", isUser ? user : null);
      store.set("loggedIn", isUser);
      return isUser ? user : null;
    } catch (e) {
      store.set("user", null);
      store.set("loggedIn", false);
      throw e;
    }
  }

  public async signin(data: SignInType) {
    const res = await AuthAPI.signin(data);
    if (res.status === 200) {
      await this.getUser();
    }
    return res;
  }

  public async signup(data: SignUpType) {
    const res = await AuthAPI.signup(data);
    if (res.status === 200) {
      await this.getUser();
    }
    return res;
  }

  public async logout() {
    const res = await AuthAPI.logout();
    store.set("user", null);
    store.set("loggedIn", false);
    return res;
  }

  // User
  public async changeAvatar(form: FormData) {
    try {
      const res = await UserAPI.changeAvatar(form);
      console.log("AVATAR", res);
      if (res.status === 200) {
        // Успешно — обновляем store.user
        await this.getUser(); // обновит store с новым аватаром
        return true;
      } else {
        // Ошибка
        const resp = res.response || res.responseText;
        throw new Error(resp);
      }
    } catch (e) {
      return false;
    }
  }
}

export default new UserController();
