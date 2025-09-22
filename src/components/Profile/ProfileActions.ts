import Block from "@/framework/Block";
import { Link } from "@/components/Link";

type ProfileActionsProps = {
  onEditClick: () => void;
};

export class ProfileActions extends Block {
  constructor(props: ProfileActionsProps) {
    const changeProfileLink: Link = new Link({
      href: "#",
      text: "Изменить данные",
      className: "link actions__link--edit",
    });

    const signOutLink: Link = new Link({
      href: "#",
      datapage: "signIn",
      text: "Выйти",
      className: "link link--red",
    });

    super({
      ...props,
      changeProfileLink,
      signOutLink,
      events: {
        click: (event: MouseEvent) => {
          const target = event.target as HTMLElement;
          if (target.matches(".actions__link--edit")) {
            event.preventDefault();
            props.onEditClick();
          }
        },
      },
    });
  }

  override render(): string {
    return `
      <ul class="actions">
        <li class="actions__item">
          {{{changeProfileLink}}}
        </li>
        <li class="actions__item">
          {{{signOutLink}}}
        </li>
      </ul>`;
  }
}
