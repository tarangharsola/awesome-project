import { WSMessage } from './useWebSocket';

type EventHandler = (msg: WSMessage) => void;

export class WebSocketClient {
  private url: string;
  private ws?: WebSocket;
  private handlers: Map<string, Set<EventHandler>> = new Map();
  private reconnectAttempts = 0;
  private readonly maxAttempts = 5;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.dispatch({ type: 'open', payload: null });
    };
    this.ws.onmessage = (ev) => {
      try {
        const data: WSMessage = JSON.parse(ev.data);
        this.dispatch(data);
      } catch {
        // ignore malformed messages
      }
    };
    this.ws.onclose = () => {
      this.dispatch({ type: 'close', payload: null });
      if (this.reconnectAttempts < this.maxAttempts) {
        setTimeout(() => {
          this.reconnectAttempts++;
          this.connect();
        }, 1000 * this.reconnectAttempts);
      }
    };
    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private dispatch(message: WSMessage) {
    const set = this.handlers.get(message.type);
    if (set) {
      set.forEach((h) => h(message));
    }
  }

  public send(type: string, payload: any) {
    const msg = JSON.stringify({ type, payload });
    this.ws?.send(msg);
  }

  public on(type: string, handler: EventHandler) {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, new Set());
    }
    this.handlers.get(type)!.add(handler);
  }

  public off(type: string, handler: EventHandler) {
    this.handlers.get(type)?.delete(handler);
  }

  public close() {
    this.ws?.close();
  }
}
