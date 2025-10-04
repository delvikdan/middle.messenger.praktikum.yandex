import { HTTPTransport } from "@/framework/HTTPTransport";

const API_URL = "https://ya-praktikum.tech/api/v2";

const http = new HTTPTransport();

// Для регистрации
export function signup(data: {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}) {
  return http
    .post(`${API_URL}/auth/signup`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    })
    .then((xhr: XMLHttpRequest) => {
      return {
        status: xhr.status,
        response: xhr.response ? JSON.parse(xhr.response) : null,
      };
    });
}

// Для логина (авторизации)
export function signin(data: { login: string; password: string }) {
  return http
    .post(`${API_URL}/auth/signin`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    })
    .then((xhr: XMLHttpRequest) => {
      return {
        status: xhr.status,
        response: xhr.response ? JSON.parse(xhr.response) : null,
      };
    });
}
