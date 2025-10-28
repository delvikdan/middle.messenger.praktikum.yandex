import { expect } from "chai";

describe("smoke: test setup", () => {
  it("provides jsdom globals", () => {
    expect(globalThis.window).to.exist;
    expect(globalThis.document).to.exist;

    const div = document.createElement("div");
    document.body.appendChild(div);
    expect(div).to.be.instanceOf(window.HTMLElement);
  });

  it("has chai expect available", () => {
    expect(1 + 1).to.equal(2);
  });
});
