import Block from "@/framework/Block";
import { Error } from "@/components/Error";

export type ErrorPageProps = {
  code: string;
};

export class ErrorPage extends Block {
  constructor(props: ErrorPageProps) {
    const error: Error = new Error({
      code: props.code,
      status: "Мы уже фиксим",
      href: "#",
      text: "Назад к чатам",
      datapage: "chat",
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
