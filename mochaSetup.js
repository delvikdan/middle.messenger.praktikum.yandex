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

// Expose window/document and selected properties on the global scope
const { window } = dom;
const { document, navigator } = window;

globalThis.window = window;
globalThis.document = document;
globalThis.navigator = navigator;

// Copy commonly used constructors and props from window to global
const propsToCopy = ["FormData", "Node", "HTMLElement", "XMLHttpRequest"];

for (const key of propsToCopy) {
  if (key in window && !(key in globalThis)) {
    globalThis[key] = window[key];
  }
}

// Expose chai expect globally for convenience
// Types are provided by @types/chai in devDependencies
// eslint-disable-next-line no-underscore-dangle
globalThis.expect = expect;

// Provide a basic localStorage/sessionStorage using jsdom's implementation
// if (!("localStorage" in globalThis)) {
//   globalThis.localStorage = window.localStorage;
// }
// if (!("sessionStorage" in globalThis)) {
//   globalThis.sessionStorage = window.sessionStorage;
// }

// Ensure fetch exists (Node >= 18 has a global fetch)
// If running on older Node, you could uncomment and add a ponyfill
// import fetch, { Headers, Request, Response } from 'node-fetch';
// if (!globalThis.fetch) Object.assign(globalThis, { fetch, Headers, Request, Response });

// Silence jsdom "not implemented" errors for features your tests don't use
// You can customize this as needed for your project
// const origError = console.error;
// console.error = (...args) => {
//   const first = String(args[0] ?? "");
//   if (first.includes("Not implemented:")) return;
//   origError(...args);
// };
