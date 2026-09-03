import { WebSocketMessage } from '../types/websocketMessage';

type MessageHandler = (msg: WebSocketMessage) => void;

export class WebSocketManager {
  private url: string;
  private ws: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxDelay = 30000; // 30 seconds max backoff
  private messageQueue: WebSocketMessage[] = [];
  private handlers: Set<MessageHandler> = new Set();
  private statusCallback: ((status: 'connected' | 'disconnected' | 'connecting') => void) | null = null;
  private userInfo: { username: string; color: string } | null = null;

  constructor(url: string, userInfo: { username: string; color: string }) {
    this.url = url;
    this.userInfo = userInfo;
    this.connect();
  }

  private connect() {
    this.updateStatus('connecting');
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.updateStatus('connected');
      if (this.userInfo) {
        this.send({ type: 'join', payload: { username: this.userInfo.username, color: this.userInfo.color } });
      }
      this.flushQueue();
    };
    this.ws.onmessage = (ev) => {
      const data = JSON.parse(ev.data) as WebSocketMessage;
      this.handlers.forEach((h) => h(data));
    };
    this.ws.onclose = () => {
      this.updateStatus('disconnected');
      this.scheduleReconnect();
    };
    this.ws.onerror = () => {
      this.ws?.close();
    };
  }

  private scheduleReconnect() {
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, this.maxDelay);
    setTimeout(() => {
      this.reconnectAttempts++;
      this.connect();
    }, delay);
  }

  private flushQueue() {
    while (this.messageQueue.length && this.ws?.readyState === WebSocket.OPEN) {
      const msg = this.messageQueue.shift()!;
      this.ws.send(JSON.stringify(msg));
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

  private updateStatus(status: 'connected' | 'disconnected' | 'connecting') {
    if (this.statusCallback) this.statusCallback(status);
  }

  onStatusChange(cb: (status: string) => void) {
    this.statusCallback = cb;
  }

  close() {
    this.ws?.close();
  }
}

export default WebSocketManager;
