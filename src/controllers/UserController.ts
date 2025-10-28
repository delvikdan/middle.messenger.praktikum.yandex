import * as AuthAPI from "../api/auth.ts";
import * as UserAPI from "../api/user.ts";
import store from "../store/store.ts";
import { PasswordType, SignInType, SignUpType, UserType } from "../types/user.ts";

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
    store.reset();
    localStorage.removeItem("activeChat");
    return res;
  }

  // User
  public async changeAvatar(form: FormData) {
    try {
      const res = await UserAPI.changeAvatar(form);
      if (res.status === 200) {
        await this.getUser();
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

  public async changeProfile(data: SignUpType) {
    const res = await UserAPI.changeProfile(data);
    if (res.status === 200) {
      await this.getUser();
    }
    return res;
  }

  public async changePassword(data: PasswordType) {
    const res = await UserAPI.changePassword(data);
    if (res.status === 200) {
      await this.getUser();
    }
    return res;
  }

  public async findUser(login: string) {
    const sanitizedLogin = login.trim().toLowerCase();
    const res = await UserAPI.findUser({ login });

    if (res.status === 200) {
      return res.users
        .filter((user: UserType) => {
          const userLogin = user.login.trim().toLowerCase();
          return userLogin === sanitizedLogin;
        })
        .map((user: UserType) => user.id);
    }

    return res;
  }
}

export default new UserController();
