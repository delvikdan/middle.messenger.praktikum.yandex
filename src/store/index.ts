import EventBus from "@/framework/EventBus";
import { set } from "@/helpers/utils";
import { UserType } from "@/types/user";

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
