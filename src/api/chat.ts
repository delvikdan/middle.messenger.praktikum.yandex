import { API_URL, http } from "./config.ts";
import { ChatType } from "../types/chat.ts";

export const getChats = (): Promise<ChatType[]> => {
  return http.get(`${API_URL}/chats`, {}).then((xhr: XMLHttpRequest) => {
    const responseText = xhr.responseText || xhr.response || "";

    if (responseText.trim()) {
      try {
        return JSON.parse(responseText);
      } catch (error) {
        console.error("Error parsing JSON response:", error);
        throw new Error("Failed to parse response");
      }
    }

    return [];
  });
};

export const createChat = (data: { title: string }) => {
  return http
    .post(`${API_URL}/chats`, {
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

export const deleteChat = (chatId: number) => {
  return http
    .delete(`${API_URL}/chats`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify({ chatId }),
    })
    .then((xhr: XMLHttpRequest) => {
      return { status: xhr.status, response: xhr.response || xhr.responseText };
    });
};

export const getToken = (chatId: number): Promise<{ token: string }> => {
  return http
    .post(`${API_URL}/chats/token/${chatId}`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((xhr: XMLHttpRequest) => {
      try {
        const responseData = JSON.parse(xhr.response);
        return { token: responseData.token };
      } catch (error) {
        throw new Error("Failed to parse token from response");
      }
    });
};

export const changeChatAvatar = (form: FormData) => {
  return http.put(`${API_URL}/chats/avatar`, {
    data: form,
  });
};

export const getUsersOfChat = (id: number) => {
  return http
    .get(`${API_URL}/chats/${id}/users`)
    .then((xhr: XMLHttpRequest) => {
      try {
        const responseData = JSON.parse(
          xhr.responseText || xhr.response || "[]"
        );
        return responseData;
      } catch (error) {
        throw new Error("Failed to parse chat users response");
      }
    });
};

export const deleteChatUser = (data: { users: number[]; chatId: number }) => {
  return http
    .delete(`${API_URL}/chats/users`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    })
    .then((xhr: XMLHttpRequest) => {
      return { status: xhr.status, response: xhr.response || xhr.responseText };
    });
};

export const addUsers = (data: { users: number[]; chatId: number }) => {
  return http
    .put(`${API_URL}/chats/users`, {
      headers: { "Content-Type": "application/json" },
      data: JSON.stringify(data),
    })
    .then((xhr: XMLHttpRequest) => {
      try {
        const responseData = JSON.parse(xhr.response || "{}");
        return {
          status: xhr.status,
          data: responseData,
        };
      } catch (error) {
        return {
          status: xhr.status,
          data: null,
          error: "Failed to parse response",
        };
      }
    });
};
