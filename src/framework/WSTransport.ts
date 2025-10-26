import { WSMessage } from "@/types/chat";

export class WSTransport {
  private socket: WebSocket | null = null;

  private chatId: number;

  private userId: number;

  private token: string;

  private listeners: ((data: WSMessage[]) => void)[] = [];

  constructor(chatId: number, userId: number, token: string) {
    this.chatId = chatId;
    this.userId = userId;
    this.token = token;
  }

  connect() {
    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.chatId}/${this.token}`
    );
    this.socket.addEventListener("open", this.handleOpen);
    this.socket.addEventListener("close", this.handleClose);
    this.socket.addEventListener("message", this.handleMessage);
    this.socket.addEventListener("error", this.handleError);
  }

  onMessage(cb: (messages: WSMessage[] | WSMessage) => void) {
    this.listeners.push(cb);
  }

  send(content: string, type: "message" | "get old" = "message") {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ content, type }));
    } else {
      console.warn("Socket not open!");
    }
  }

  close() {
    this.socket?.close();
    this.socket = null;
  }

  private handleOpen = () => {
    this.send("0", "get old");
    console.log("Connection open");
  };

  private handleClose = (event: CloseEvent) => {
    console.log("Connection closed", event);
  };

  private handleMessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      this.listeners.forEach((cb) => cb(data));
    } catch (e) {
      console.error("WS parse error", e);
    }
  };

  private handleError = (event: Event) => {
    console.error("WS error", event);
  };
}
