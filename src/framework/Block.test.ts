import { expect } from "chai";

import Block, { type BlockProps } from "./Block.ts";

class Label extends Block<{ text: string }> {
  protected render(): string {
    return '<span class="label">{{text}}</span>';
  }
}

class Item extends Block<{ val: string }> {
  protected render(): string {
    return '<li class="item">{{val}}</li>';
  }
}

class TestView extends Block<{ title: string } & BlockProps> {
  protected render(): string {
    return `
      <div id="view" class="root">
        {{{child}}}
        <ul class="list">{{{items}}}</ul>
        <span class="title">{{title}}</span>
      </div>`;
  }
}

class NoUpdateView extends Block<{ title: string }> {
  protected render(): string {
    return '<div class="nu"><span class="title">{{title}}</span></div>';
  }

  protected override componentDidUpdate(): boolean {
    return false;
  }
}

describe("Block", () => {
  it("renders on construct and exposes element", () => {
    const child = new Label({ text: "child" });
    const items = [new Item({ val: "a" }), new Item({ val: "b" })];
    const comp = new TestView({ title: "Hello", child, items });

    const el = comp.getContent();
    expect(el).to.be.instanceOf(window.HTMLElement);
    expect(el.querySelector(".title")?.textContent).to.equal("Hello");

    expect(el.querySelector(".label")?.textContent).to.equal("child");

    expect(el.querySelectorAll("li.item").length).to.equal(2);
  });

  it("sets attributes and binds events", () => {
    let clicked = false;
    const child = new Label({ text: "x" });
    const comp = new TestView({
      title: "T",
      child,
      items: [],
      attr: { "data-test": "1" },
      events: {
        click: () => {
          clicked = true;
        },
      },
    });
    const el = comp.getContent();
    expect(el.getAttribute("data-test")).to.equal("1");

    el.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    expect(clicked).to.be.true;
  });

  it("re-renders on setProps and preserves event listeners", () => {
    const child = new Label({ text: "x" });
    let clicks = 0;
    const comp = new TestView({
      title: "Before",
      child,
      items: [],
      events: {
        click: () => {
          clicks += 1;
        },
      },
    });

    const firstEl = comp.getContent();
    expect(firstEl.querySelector(".title")?.textContent).to.equal("Before");

    comp.setProps({ title: "After" });
    const el = comp.getContent();
    expect(el.querySelector(".title")?.textContent).to.equal("After");

    el.dispatchEvent(new window.MouseEvent("click", { bubbles: true }));
    expect(clicks).to.equal(1);
  });

  it("replaces child stub (data-id) with child content", () => {
    const child = new Label({ text: "child" });
    const comp = new TestView({ title: "T", child, items: [] });
    const el = comp.getContent();
    expect(el.querySelector("[data-id]")).to.equal(null);
    expect(el.querySelector(".label")?.textContent).to.equal("child");
  });

  it("componentDidUpdate=false prevents re-render", () => {
    const comp = new NoUpdateView({ title: "A" });
    const el = comp.getContent();
    expect(el.querySelector(".title")?.textContent).to.equal("A");
    comp.setProps({ title: "B" });
    expect(comp.getContent().querySelector(".title")?.textContent).to.equal(
      "A"
    );
  });
});
