import Block, { BlockProps } from "../framework/Block.ts";
import store, { StoreEvents, StoreState } from "../store/Store.ts";
import isEqual from "../helpers/isEqual.ts";

type BlockConstructor = new (props?: BlockProps) => Block;

export function connect(
  Component: BlockConstructor,
  select: (
    state: StoreState,
    ownProps?: BlockProps
  ) => Record<string, unknown> = (state) => state
): BlockConstructor {
  return class extends Component {
    private _storeHandler: () => void;

    constructor(props: BlockProps = {}) {
      super({ ...props, ...select(store.getState(), props) });
      this._storeHandler = () => {
        const selected = select(store.getState(), this.props);

        const prevProps: Record<string, unknown> = {};
        for (const key in selected) {
          if (Object.prototype.hasOwnProperty.call(selected, key)) {
            prevProps[key] = this.props[key];
          }
        }
        if (!isEqual(prevProps, selected)) {
          this.setProps(selected);
        }
      };
      store.on(StoreEvents.Updated, this._storeHandler);
    }

    componentWillUnmount() {
      store.off(StoreEvents.Updated, this._storeHandler);
    }
  };
}
