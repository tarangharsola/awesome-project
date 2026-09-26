import { WSMessage } from '../types/websocketMessage';

export class WebSocketClient {
  private socket: WebSocket;
  private listeners: Array<(msg: WSMessage) => void> = [];

  constructor(url: string) {
    this.socket = new WebSocket(url);
    this.socket.addEventListener('message', this.handleMessage);
  }

  private handleMessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data) as WSMessage;
      this.listeners.forEach((cb) => cb(data));
    } catch {
      // Silently ignore malformed messages
    }
  };

  send(message: WSMessage) {
    this.socket.send(JSON.stringify(message));
  }

  onMessage(callback: (msg: WSMessage) => void) {
    this.listeners.push(callback);
  }

  close() {
    this.socket.close();
  }
}
