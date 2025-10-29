import { expect } from "chai";

import { HTTPTransport } from "./HTTPTransport.ts";

type Handler = (() => void) | ((ev: unknown) => void) | null;

class MockXMLHttpRequest {
  static instances: MockXMLHttpRequest[] = [];

  static last(): MockXMLHttpRequest {
    return this.instances[this.instances.length - 1];
  }

  method: string | null = null;

  url: string | null = null;

  timeout = 0;

  withCredentials = false;

  headers: Record<string, string> = {};

  sentData: unknown = undefined;

  status = 200;

  response = "" as unknown as string;

  responseText = "";

  onload: Handler = null;

  onabort: Handler = null;

  onerror: Handler = null;

  ontimeout: Handler = null;

  constructor() {
    MockXMLHttpRequest.instances.push(this);
  }

  open(method: string, url: string) {
    this.method = method;
    this.url = url;
  }

  setRequestHeader(name: string, value: string) {
    this.headers[name] = value;
  }

  send(data?: unknown) {
    this.sentData = data;
  }
}

describe("HTTPTransport", () => {
  const OriginalXHR = globalThis.XMLHttpRequest;

  beforeEach(() => {
    globalThis.XMLHttpRequest =
      MockXMLHttpRequest as unknown as typeof XMLHttpRequest;
    MockXMLHttpRequest.instances = [];
  });

  afterEach(() => {
    globalThis.XMLHttpRequest = OriginalXHR as unknown as typeof XMLHttpRequest;
  });

  it("performs GET with query string when data provided", async () => {
    const http = new HTTPTransport();
    const p = http.get("/api/test", { data: { a: 1, b: "x y" } });
    const xhr = MockXMLHttpRequest.last();

    xhr.status = 200;
    xhr.responseText = "OK";
    if (xhr.onload) {
      xhr.onload({} as Event);
    }
    await p;

    expect(xhr.method).to.equal("GET");
    expect(xhr.url).to.equal("/api/test?a=1&b=x%20y");
    expect(xhr.sentData).to.equal(undefined);
  });

  it("sets headers and sends body for POST", async () => {
    const http = new HTTPTransport();
    const body = JSON.stringify({ foo: "bar" });
    const p = http.post("/api/items", {
      headers: { "Content-Type": "application/json" },
      data: body,
    });
    const xhr = MockXMLHttpRequest.last();
    xhr.status = 201;
    xhr.responseText = "{}";
    if (xhr.onload) {
      xhr.onload({} as Event);
    }
    await p;

    expect(xhr.method).to.equal("POST");
    expect(xhr.url).to.equal("/api/items");
    expect(xhr.headers["Content-Type"]).to.equal("application/json");
    expect(xhr.sentData).to.equal(body);
  });

  it("does not set headers when sending FormData", async () => {
    const http = new HTTPTransport();
    const form = new FormData();
    form.append("file", new Blob(["x"], { type: "text/plain" }), "a.txt");
    const p = http.put("/upload", {
      data: form,
      headers: { "Content-Type": "should-not-apply" },
    });
    const xhr = MockXMLHttpRequest.last();
    xhr.status = 200;
    xhr.responseText = "ok";
    if (xhr.onload) {
      xhr.onload({} as Event);
    }
    await p;

    expect(xhr.method).to.equal("PUT");
    expect(xhr.sentData).to.equal(form);
    expect(xhr.headers["Content-Type"]).to.equal(undefined);
  });

  it("honors withCredentials and timeout options", async () => {
    const http = new HTTPTransport();
    const p = http.delete("/remove", { timeout: 1234 });
    const xhr = MockXMLHttpRequest.last();
    xhr.status = 204;
    xhr.responseText = "";
    if (xhr.onload) {
      xhr.onload({} as Event);
    }
    await p;

    expect(xhr.withCredentials).to.equal(true);
    expect(xhr.timeout).to.equal(1234);
  });

  it("rejects on abort/error", async () => {
    const http = new HTTPTransport();
    const p = http.get("/will-abort");
    const xhr = MockXMLHttpRequest.last();
    let rejected = false;

    try {
      if (xhr.onload) {
        xhr.onabort?.(new Event("abort"));
      }
      await p;
    } catch (e) {
      rejected = true;
    }
    expect(rejected).to.equal(true);
  });
});
