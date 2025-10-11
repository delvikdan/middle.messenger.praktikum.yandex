// Смена профиля, смена аватара, смена пароля и т.п.

import { API_URL, http } from "@/api/config";
import { PasswordType, SignUpType } from "@/types/user";

const userRequest = <T extends object>(endpoint: string, data: T) => {
  return http
    .put(`${API_URL}/user/${endpoint}`, {
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

// Изменение профиля
export const changeProfile = (data: SignUpType) => {
  return userRequest("profile", data);
};

// Смена пароля
export const changePassword = (data: PasswordType) => {
  return userRequest("password", data);
};

// Аватар
export const changeAvatar = (form: FormData) => {
  return http.put(`${API_URL}/user/profile/avatar`, {
    data: form,
  });
};
