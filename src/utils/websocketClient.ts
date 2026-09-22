import { WebSocketMessage } from '../types/websocketMessage';

type MessageQueue = WebSocketMessage[];

export class WebSocketClient {
  private url: string;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxBackoff = 30000; // 30 seconds
  private readonly baseBackoff = 500; // 0.5 second
  private messageQueue: MessageQueue = [];
  private listeners: { [event: string]: ((ev: any) => void)[] } = {};

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = (ev) => this.handleOpen(ev);
    this.ws.onmessage = (ev) => this.handleMessage(ev);
    this.ws.onclose = (ev) => this.handleClose(ev);
    this.ws.onerror = (ev) => this.handleError(ev);
  }

  private handleOpen(event: Event) {
    this.reconnectAttempts = 0;
    this.flushQueue();
    this.emit('open', event);
  }

  private handleMessage(event: MessageEvent) {
    let data: WebSocketMessage;
    try {
      data = JSON.parse(event.data);
    } catch {
      // ignore malformed messages
      return;
    }
    this.emit('message', data);
  }

  private handleClose(event: CloseEvent) {
    this.emit('close', event);
    this.scheduleReconnect();
  }

  private handleError(event: Event) {
    this.emit('error', event);
    // Errors also trigger close; reconnection handled there
  }

  private scheduleReconnect() {
    this.reconnectAttempts += 1;
    const backoff = Math.min(
      this.baseBackoff * 2 ** (this.reconnectAttempts - 1),
      this.maxBackoff
    );
    setTimeout(() => this.connect(), backoff);
  }

  private flushQueue() {
    while (this.messageQueue.length > 0 && this.ws && this.ws.readyState === WebSocket.OPEN) {
      const msg = this.messageQueue.shift();
      if (msg) this.ws.send(JSON.stringify(msg));
    }
  }

  send(message: WebSocketMessage) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  close() {
    if (this.ws) {
      this.ws.close();
    }
  }

  on(event: string, handler: (ev: any) => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(handler);
  }

  off(event: string, handler: (ev: any) => void) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((h) => h !== handler);
  }

  private emit(event: string, payload: any) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach((handler) => handler(payload));
  }
}

// Export a singleton for the app to use
let clientInstance: WebSocketClient | null = null;
export const getWebSocketClient = (url: string): WebSocketClient => {
  if (!clientInstance) clientInstance = new WebSocketClient(url);
  return clientInstance;
};