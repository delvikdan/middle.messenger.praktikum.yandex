import { HTTPTransport } from "@/framework/HTTPTransport";

const API_URL = "https://ya-praktikum.tech/api/v2";
const http = new HTTPTransport();

// Для регистрации
export const signup = (data: {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}) => {
  return http
    .post(`${API_URL}/auth/signup`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    })
    .then((xhr: XMLHttpRequest) => {
      return {
        status: xhr.status,
        response: xhr.response,
      };
    });
};

// Для логина
export const signin = (data: { login: string; password: string }) => {
  return http
    .post(`${API_URL}/auth/signin`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    })
    .then((xhr: XMLHttpRequest) => ({
      status: xhr.status,
      response: xhr.response,
    }));
};

// Юзер
export const getUser = () => {
  return http.get(`${API_URL}/auth/user`, {}).then((xhr: XMLHttpRequest) => {
    const responseText = xhr.responseText || xhr.response || "";
    if (responseText.trim().startsWith("{")) return JSON.parse(responseText);
    return responseText;
  });
};
