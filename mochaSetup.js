// ESM setup file for Mocha test environment
// - Sets up jsdom to emulate the browser
// - Exposes common globals (window, document, etc.)
// - Exposes chai's expect globally

import { JSDOM } from "jsdom";
import { expect } from "chai";

// Create a minimal DOM
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
globalThis.navigator = navigator;

const propsToCopy = ["FormData", "Node", "HTMLElement", "XMLHttpRequest"];

for (const key of propsToCopy) {
  if (key in window && !(key in globalThis)) {
    globalThis[key] = window[key];
  }
}

globalThis.expect = expect;
