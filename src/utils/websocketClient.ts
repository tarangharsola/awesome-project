import { WSMessage } from "../types/websocketMessage";

class WebSocketClient {
  private socket: WebSocket;
  private url: string;
  private listeners: Set<(msg: WSMessage) => void> = new Set();

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);
    this.socket.addEventListener("message", (event) => {
      const data: WSMessage = JSON.parse(event.data);
      this.listeners.forEach((cb) => cb(data));
    });
    this.socket.addEventListener("close", () => {
      setTimeout(() => this.connect(), 1000);
    });
  }

  public send(msg: WSMessage) {
    if (this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(msg));
    }
  }

  public onMessage(cb: (msg: WSMessage) => void) {
    this.listeners.add(cb);
    return () => this.listeners.delete(cb);
  }
}

export default WebSocketClient;
