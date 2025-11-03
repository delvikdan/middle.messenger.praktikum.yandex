import Block from "../framework/Block.ts";
import { Link, type LinkProps } from "./Link.ts";

export type ErrorProps = LinkProps & {
  code: string;
  status: string;
};

export class Error extends Block {
  constructor(props: ErrorProps) {
    const link: Link = new Link({
      ...props,
      className: "link",
    });

    super({ ...props, link });
  }

  override render(): string {
    return `
    <div class="error-container">
      <div class="error-page">
        <h1 class="error-page__code">{{code}}</h1>
        <p class="error-page__status">{{status}}</p>
      </div>
      {{{link}}}
    </div>`;
  }
}
