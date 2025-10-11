import { API_URL, http } from "@/api/config";
import { SignInType, SignUpType } from "@/types/user";

const authRequest = <T extends object>(endpoint: string, data: T) => {
  return http
    .post(`${API_URL}/auth/${endpoint}`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    })
    .then((xhr: XMLHttpRequest) => {
      try {
        const responseData = JSON.parse(xhr.response);
        return {
          status: xhr.status,
          reason: responseData.reason,
        };
      } catch (error) {
        return {
          status: xhr.status,
          reason: null,
          error: "Failed to parse response",
        };
      }
    });
};

// Для регистрации
export const signup = (data: SignUpType) => {
  return authRequest("signup", data);
};
// Для авторизации
export const signin = (data: SignInType) => {
  return authRequest("signin", data);
};

// Получить юзера
export const getUser = () => {
  return http.get(`${API_URL}/auth/user`, {}).then((xhr: XMLHttpRequest) => {
    const responseText = xhr.responseText || xhr.response || "";
    if (responseText.trim().startsWith("{")) return JSON.parse(responseText);
    return responseText;
  });
};

// Выход
export const logout = () => {
  return http
    .post(`${API_URL}/auth/logout`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((xhr: XMLHttpRequest) => {
      return { status: xhr.status };
    });
};
