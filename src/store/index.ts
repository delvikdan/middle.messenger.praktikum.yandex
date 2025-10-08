import EventBus from "@/framework/EventBus";
import { set } from "@/helpers/utils";

// Определи UserType (или импортируй из нужного файла)
export type UserType = {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  // ... другие поля пользователя
};

export enum StoreEvents {
  Updated = "updated",
}

export type StoreState = {
  user?: UserType | null;
  loggedIn?: boolean;
  // Можно добавить другие поля, например:
  // isLoading?: boolean;
  // chatList?: ChatType[];
};

class Store extends EventBus {
  private state: StoreState = {};

  public getState(): StoreState {
    return { ...this.state }; // поверхностная копия
  }

  public set(path: string, value: unknown): void {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();
export default store;
