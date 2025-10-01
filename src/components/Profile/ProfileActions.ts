import Block from "@/framework/Block";
import { Link } from "@/components/Link";

type ProfileActionsProps = {
  onEditProfileClick: () => void;
  onChangePasswordClick: () => void;
};

export class ProfileActions extends Block {
  constructor(props: ProfileActionsProps) {
    const editProfileLink: Link = new Link({
      href: "#",
      text: "Изменить данные",
      className: "link actions__link--profile",
    });

    const changePasswordLink: Link = new Link({
      href: "#",
      text: "Изменить пароль",
      className: "link actions__link--password",
    });

    const signOutLink: Link = new Link({
      href: "/",
      text: "Выйти",
      className: "link link--red",
      isRouterLink: true,
    });

    super({
      ...props,
      editProfileLink,
      changePasswordLink,
      signOutLink,
      events: {
        click: (event: MouseEvent): void => {
          const target = event.target as HTMLElement;
          if (target.matches(".actions__link--profile")) {
            event.preventDefault();
            props.onEditProfileClick();
          }
          if (target.matches(".actions__link--password")) {
            event.preventDefault();
            props.onChangePasswordClick();
          }
        },
      },
    });
  }

  override render(): string {
    return `
      <ul class="actions">
        <li class="actions__item">
          {{{editProfileLink}}}
        </li>
        <li class="actions__item">
          {{{changePasswordLink}}}
        </li>
        <li class="actions__item">
          {{{signOutLink}}}
        </li>
      </ul>`;
  }
}
