import { WebSocketMessage } from '../types/websocketMessage';
import { getUserInfo } from '../store/user';

type MessageHandler = (msg: WebSocketMessage) => void;

class ReconnectingWebSocket {
  private url: string;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxDelay = 30000; // 30 seconds max backoff
  private messageQueue: WebSocketMessage[] = [];
  private handlers: Set<MessageHandler> = new Set();

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.flushQueue();
      // Announce presence on (re)connect
      const user = getUserInfo();
      this.send({ type: 'join', payload: { username: user.name, color: user.color } });
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
    this.reconnectAttempts++;
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, this.maxDelay);
    setTimeout(() => this.connect(), delay);
  }

  private flushQueue() {
    while (this.messageQueue.length && this.ws?.readyState === WebSocket.OPEN) {
      const msg = this.messageQueue.shift()!;
      this.ws.send(JSON.stringify(msg));
    }
  }

  public send(msg: WebSocketMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else {
      this.messageQueue.push(msg);
    }
  }

  public addMessageHandler(handler: MessageHandler) {
    this.handlers.add(handler);
  }

  public removeMessageHandler(handler: MessageHandler) {
    this.handlers.delete(handler);
  }

  public get readyState() {
    return this.ws?.readyState ?? WebSocket.CLOSED;
  }
}

const wsClient = new ReconnectingWebSocket(
  `${process.env.REACT_APP_WS_URL ?? 'ws://localhost:4000'}`
);

export default wsClient;
