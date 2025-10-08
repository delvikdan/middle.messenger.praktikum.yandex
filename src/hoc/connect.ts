import Block, { BlockProps } from "@/framework/Block";
import store, { StoreEvents, StoreState } from "@/store";

type BlockConstructor = new (props?: BlockProps) => Block;

export function connect(
  Component: BlockConstructor,
  select: (state: StoreState) => Record<string, unknown> = (state) => state
) {
  return class extends Component {
    private _storeHandler: () => void;

    constructor(props: BlockProps) {
      super({ ...props, ...select(store.getState()) });
      this._storeHandler = () => {
        this.setProps(select(store.getState()));
      };
      store.on(StoreEvents.Updated, this._storeHandler);
    }

    componentWillUnmount() {
      store.off(StoreEvents.Updated, this._storeHandler);
    }
  };
}
