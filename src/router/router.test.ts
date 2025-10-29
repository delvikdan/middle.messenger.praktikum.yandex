import { expect } from "chai";
import sinon from "sinon";

import Block from "../framework/Block.ts";
import { Router } from "./Route.ts";
import store from "../store/store.ts";

class SignInPage extends Block {
  protected render(): string {
    return '<div id="view">SignIn</div>';
  }
}

class SignUpPage extends Block {
  protected render(): string {
    return '<div id="view">SignUp</div>';
  }
}

class MessengerPage extends Block {
  protected render(): string {
    return '<div id="view">Messenger</div>';
  }
}

class SettingsPage extends Block {
  protected render(): string {
    return '<div id="view">Settings</div>';
  }
}

class NotFoundPage extends Block {
  protected render(): string {
    return '<div id="view">NotFound</div>';
  }
}

describe("Router", () => {
  let router: Router;
  let pushSpy: sinon.SinonSpy;

  before(() => {
    const root = document.createElement("div");
    root.id = "app";
    document.body.appendChild(root);

    router = new Router("#app");
    router
      .use("/", SignInPage)
      .use("/sign-up", SignUpPage)
      .use("/messenger", MessengerPage)
      .use("/settings", SettingsPage)
      .use("/404", NotFoundPage);
    router.start();
  });

  beforeEach(() => {
    store.reset();
    const root = document.querySelector("#app")!;
    root.innerHTML = "";
    pushSpy = sinon.spy(window.history, "pushState");
  });

  afterEach(() => {
    pushSpy.restore();
  });

  const viewText = () => document.querySelector("#view")?.textContent || "";

  it('redirects guest from protected routes to "/"', () => {
    router.go("/settings");
    expect(viewText()).to.equal("SignIn");
    expect(pushSpy.callCount).to.be.greaterThanOrEqual(2);
    expect(window.location.pathname).to.equal("/");
  });

  it('redirects authenticated user from "/" to "/messenger"', () => {
    store.set("user", { id: 1 } as unknown);
    router.go("/");
    expect(viewText()).to.equal("Messenger");
    expect(window.location.pathname).to.equal("/messenger");
  });

  it('redirects authenticated user from "/sign-up" to "/messenger"', () => {
    store.set("user", { id: 1 } as unknown);
    router.go("/sign-up");
    expect(viewText()).to.equal("Messenger");
    expect(window.location.pathname).to.equal("/messenger");
  });

  it('navigates to not found ("/404") for unknown routes', () => {
    store.set("user", { id: 1 } as unknown);
    router.go("/unknown");
    expect(viewText()).to.equal("NotFound");
    expect(window.location.pathname).to.equal("/404");
  });

  it("getRoute returns a registered route", () => {
    const route = router.getRoute("/messenger");
    expect(route).to.exist;
  });

  it("handles anchor clicks with data-router-link", () => {
    store.set("user", { id: 1 } as unknown);
    const link = document.createElement("a");
    link.setAttribute("href", "/messenger");
    link.setAttribute("data-router-link", "");
    link.textContent = "Go";
    document.body.appendChild(link);

    const clickEvent = new window.MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    });
    link.dispatchEvent(clickEvent);

    expect(viewText()).to.equal("Messenger");
    expect(window.location.pathname).to.equal("/messenger");
  });

  it("calls history.back and history.forward", () => {
    const backStub = sinon.stub(window.history, "back");
    const forwardStub = sinon.stub(window.history, "forward");

    router.back();
    router.forward();

    expect(backStub.calledOnce).to.be.true;
    expect(forwardStub.calledOnce).to.be.true;

    backStub.restore();
    forwardStub.restore();
  });
});
