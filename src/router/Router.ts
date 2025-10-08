import Block from "@/framework/Block";
import { LoggedInStore } from "@/store/loggedIn";

type BlockClass<T extends Block = Block> = new () => T;

function isEqual(lhs: string, rhs: string) {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  if (root) {
    root.innerHTML = ""; // очищаем
    root.appendChild(block.getContent());
  }
  return root;
}

class Route {
  private _pathname: string;

  private _BlockClass: BlockClass;

  private _block: Block | null;

  private _props: { rootQuery: string };

  constructor(
    pathname: string,
    view: BlockClass,
    props: { rootQuery: string }
  ) {
    this._pathname = pathname;
    this._BlockClass = view;
    this._block = null;
    this._props = props;
  }

  leave() {
    this._block?.hide();
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    this._block = new this._BlockClass();
    render(this._props.rootQuery, this._block);
  }
}

export class Router {
  private routes: Route[] = [];

  private history = window.history;

  private _currentRoute: Route | null = null;

  private _rootQuery: string;

  private static __instance: Router;

  constructor(rootQuery: string) {
    if (Router.__instance) return Router.__instance;
    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  use(pathname: string, block: BlockClass) {
    this.routes.push(
      new Route(pathname, block, { rootQuery: this._rootQuery })
    );
    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const path = (event.currentTarget as Window).location.pathname;
      this._onRoute(path);
    };
    this._onRoute(window.location.pathname);

    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && target.hasAttribute("data-router-link")) {
        e.preventDefault();
        const href = target.getAttribute("href");
        if (href) this.go(href);
      }
    });
  }

  private _onRoute(pathname: string) {
    // const publicPaths = ["/", "/sign-up", "/404"];
    // if (!LoggedInStore.isLoggedIn && !publicPaths.includes(pathname)) {
    //   this.go("/");
    //   return;
    // }

    const route = this.getRoute(pathname);
    if (!route) {
      const notFoundRoute = this.getRoute("/404");
      if (notFoundRoute) {
        this.history.pushState({}, "", "/404");
        notFoundRoute.render();
      }
      return;
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
