// Получить список чатов, создать чат, добавить пользователя в чат и т.д.
import { API_URL, http } from "@/api/config";
import { ChatType } from "@/types/chat";

export const getChats = (): Promise<ChatType[]> => {
  return http.get(`${API_URL}/chats`, {}).then((xhr: XMLHttpRequest) => {
    const responseText = xhr.responseText || xhr.response || "";
    console.log("getChats", responseText);
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

export const deleteChat = () => {
  return http
    .post(`${API_URL}/chats`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((xhr: XMLHttpRequest) => {
      return { status: xhr.status };
    });
};
