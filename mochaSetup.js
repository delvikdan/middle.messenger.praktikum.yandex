import { JSDOM } from "jsdom";
import { expect } from "chai";

const dom = new JSDOM(
  "<!doctype html><html><head></head><body></body></html>",
  {
    url: "http://localhost/",
    pretendToBeVisual: true,
  }
);

const { window } = dom;
const { document, navigator } = window;

globalThis.window = window;
globalThis.document = document;

Object.defineProperty(globalThis, "navigator", {
  value: navigator,
  configurable: true,
});

const propsToCopy = ["FormData", "Node", "HTMLElement", "XMLHttpRequest"];

for (const key of propsToCopy) {
  if (key in window && !(key in globalThis)) {
    globalThis[key] = window[key];
  }
}

globalThis.expect = expect;
