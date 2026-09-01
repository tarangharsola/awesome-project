import { WebSocketMessage } from '../types/websocketMessage';

type MessageHandler = (msg: WebSocketMessage) => void;

type OpenHandler = () => void;

export class WebSocketClient {
  private url: string;
  private ws: WebSocket | null = null;
  private handlers: Set<MessageHandler> = new Set();
  private openHandlers: Set<OpenHandler> = new Set();
  private reconnectAttempts = 0;
  private readonly maxBackoff = 30000; // 30 seconds

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      // Notify any open listeners (e.g., hooks that need to rebroadcast presence)
      this.openHandlers.forEach((h) => h());
      // Join the room and request the latest document state
      this.send({ type: 'JOIN' });
      this.send({ type: 'REQUEST_SYNC' });
    };
    this.ws.onmessage = (ev) => {
      const data: WebSocketMessage = JSON.parse(ev.data);
      this.handlers.forEach((h) => h(data));
    };
    this.ws.onclose = () => {
      this.scheduleReconnect();
    };
    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private scheduleReconnect() {
    const backoff = Math.min(1000 * 2 ** this.reconnectAttempts, this.maxBackoff);
    setTimeout(() => {
      this.reconnectAttempts += 1;
      this.connect();
    }, backoff);
  }

  public send(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
    // In a production setting we would queue messages while disconnected.
  }

  public requestSync() {
    this.send({ type: 'REQUEST_SYNC' });
  }

  public addMessageHandler(handler: MessageHandler) {
    this.handlers.add(handler);
  }

  public removeMessageHandler(handler: MessageHandler) {
    this.handlers.delete(handler);
  }

  public addOpenHandler(handler: OpenHandler) {
    this.openHandlers.add(handler);
  }

  public removeOpenHandler(handler: OpenHandler) {
    this.openHandlers.delete(handler);
  }

  public isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
