import Block from "@/framework/Block";
import { connect } from "@/hoc/connect";

export type DisplayNameProps = {
  className: string;
  displayName: string;
};

export class DisplayName extends Block {
  constructor(props: DisplayNameProps) {
    super({ ...props });
  }

  override render(): string {
    return `<h2 class="heading-secondary {{className}}">{{ displayName }}</h2>`;
  }
}

export default connect(DisplayName, (state) => ({
  displayName: `${state.user?.first_name} ${state.user?.second_name}` || "",
}));
