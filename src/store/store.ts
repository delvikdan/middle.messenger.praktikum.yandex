import EventBus from "../framework/EventBus.ts";
import set from "../helpers/set.ts";

import { ChatType, WSMessage } from "../types/chat.ts";
import { ChatUserType, UserType } from "../types/user.ts";

export enum StoreEvents {
  Updated = "updated",
}

export type StoreState = {
  user?: UserType | null;
  loggedIn?: boolean;
  chats?: ChatType[];
  activeChat?: number;
  messages?: Record<number, WSMessage[]>;
  chatUsers?: Record<number, ChatUserType[]>;
};

export const initialState = {
  user: null,
  loggedIn: false,
  chats: [],
  activeChat: undefined,
  messages: {},
  chatUsers: {},
};

class Store extends EventBus {
  private state: StoreState = { ...initialState };

  public getState(): StoreState {
    return { ...this.state };
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }

  public reset() {
    this.state = { ...initialState };
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();
export default store;
