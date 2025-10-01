import Block from "@/framework/Block";
import { Error } from "@/components/Error";

export type ErrorPageProps = {
  code: string;
};

export class ErrorPage extends Block {
  constructor(props: ErrorPageProps = { code: "404" }) {
    const error: Error = new Error({
      code: props.code,
      status: "Мы уже фиксим",
      href: "/messenger",
      text: "Назад к чатам",
      isRouterLink: true,
    });
    super({ ...props, error });
  }

  override render(): string {
    return `
    <main class="main">
      {{{error}}}
    </main>`;
  }
}
