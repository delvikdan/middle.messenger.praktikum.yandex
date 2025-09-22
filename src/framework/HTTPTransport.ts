enum METHOD {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  DELETE = "DELETE",
}
type RequestData = Record<string, unknown>;
type RequestOptions = {
  headers?: Record<string, string>;
  method?: METHOD;
  timeout?: number;
  data?:
    | Record<string, unknown>
    | Document
    | XMLHttpRequestBodyInit
    | null
    | undefined;
};

function queryStringify(data: RequestData): string {
  if (typeof data !== "object" || data === null) {
    throw new Error("Data must be object");
  }
  const keys = Object.keys(data);
  return keys.reduce(
    (result, key, index) => {
      return (
        result +
        encodeURIComponent(key) +
        "=" +
        encodeURIComponent(String(data[key])) +
        (index < keys.length - 1 ? "&" : "")
      );
    },
    keys.length ? "?" : ""
  );
}

export class HTTPTransport {
  get = (url: string, options: RequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.GET },
      options.timeout
    );
  };

  post = (url: string, options: RequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.POST },
      options.timeout
    );
  };

  put = (url: string, options: RequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: RequestOptions = {}) => {
    return this.request(
      url,
      { ...options, method: METHOD.DELETE },
      options.timeout
    );
  };

  request = (url: string, options: RequestOptions, timeout = 5000) => {
    const { method, headers = {}, data } = options;

    if (!method) {
      throw new Error("no method");
    }

    const urlForOpen =
      method === METHOD.GET && data
        ? url + queryStringify(data as Record<string, unknown>)
        : url;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.open(method, urlForOpen);

      xhr.timeout = timeout;

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = () => {
        throw new Error("timeout");
      };

      Object.keys(headers).forEach((headerName) =>
        xhr.setRequestHeader(headerName, headers[headerName])
      );

      if (method === METHOD.GET || !data) {
        xhr.send();
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
      }
    });
  };
}
