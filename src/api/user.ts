// Смена профиля, смена аватара, смена пароля и т.п.

import { API_URL, http } from "@/api/config";

// Аватар
export const changeAvatar = (form: FormData) => {
  return http.put(`${API_URL}/user/profile/avatar`, {
    data: form,
  });
};
