import { WebSocketMessage } from '../types/websocketMessage';

type MessageHandler = (msg: WebSocketMessage) => void;
type StatusHandler = (status: 'connected' | 'disconnected' | 'reconnecting') => void;

export class WebSocketClient {
  private url: string;
  private ws: WebSocket | null = null;
  private messageQueue: WebSocketMessage[] = [];
  private handlers: Set<MessageHandler> = new Set();
  private statusHandlers: Set<StatusHandler> = new Set();
  private reconnectAttempts = 0;
  private readonly maxReconnectDelay = 30000;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.binaryType = 'arraybuffer';
    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.flushQueue();
      this.emitStatus('connected');
    };
    this.ws.onmessage = (ev) => {
      const data = typeof ev.data === 'string' ? JSON.parse(ev.data) : ev.data;
      this.handlers.forEach((h) => h(data as WebSocketMessage));
    };
    this.ws.onclose = () => {
      this.emitStatus('disconnected');
      this.scheduleReconnect();
    };
    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private scheduleReconnect() {
    this.reconnectAttempts += 1;
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, this.maxReconnectDelay);
    this.emitStatus('reconnecting');
    setTimeout(() => this.connect(), delay);
  }

  private flushQueue() {
    while (this.messageQueue.length) {
      const msg = this.messageQueue.shift()!;
      this.send(msg);
    }
  }

  send(msg: WebSocketMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(msg));
    } else {
      this.messageQueue.push(msg);
    }
  }

  addMessageHandler(handler: MessageHandler) {
    this.handlers.add(handler);
  }

  removeMessageHandler(handler: MessageHandler) {
    this.handlers.delete(handler);
  }

  addStatusHandler(handler: StatusHandler) {
    this.statusHandlers.add(handler);
  }

  removeStatusHandler(handler: StatusHandler) {
    this.statusHandlers.delete(handler);
  }

  private emitStatus(status: 'connected' | 'disconnected' | 'reconnecting') {
    this.statusHandlers.forEach((h) => h(status));
  }

  close() {
    this.ws?.close();
    this.ws = null;
  }
}
