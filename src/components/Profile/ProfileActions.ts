import Block from "@/framework/Block";
import { Link } from "@/components/Link";
import { logout } from "@/api/auth";
import { router } from "@/router";
import { LoggedInStore } from "@/store/loggedIn";

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
      onClick: (e: Event) => {
        e.preventDefault();
        logout()
          .then((res) => {
            if (res.status === 200) {
              LoggedInStore.setLoggedIn(false);
              router.go("/");
            } else {
              alert("Ошибка выхода");
            }
          })
          .catch(() => {
            console.error("Ошибка logout:", e);
          });
      },
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
