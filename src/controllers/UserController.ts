// controllers/UserController.ts
import * as UserAPI from "@/api/auth";
import store from "@/store";

class UserController {
  public async getUser() {
    try {
      const user = await UserAPI.getUser();
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

  public async signin(data) {
    const res = await UserAPI.signin(data);
    if (res.status === 200) {
      await this.getUser();
    }
    return res;
  }

  public async signup(data) {
    const res = await UserAPI.signup(data);
    if (res.status === 200) {
      await this.getUser();
    }
    return res;
  }

  public async logout() {
    await UserAPI.logout();
    store.set("user", null);
  }
}

export default new UserController();
