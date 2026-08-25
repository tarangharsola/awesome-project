import { EventEmitter } from 'events';

export interface WSMessage {
  type: string;
  payload: any;
}

export class ReconnectingWebSocket extends EventEmitter {
  private url: string;
  private ws?: WebSocket;
  private reconnectAttempts = 0;
  private maxAttempts = 10;
  private backoffBase = 500; // ms
  private messageQueue: WSMessage[] = [];
  private manuallyClosed = false;

  constructor(url: string) {
    super();
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.binaryType = 'arraybuffer';

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.emit('open');
      this.flushQueue();
    };

    this.ws.onmessage = (ev) => {
      try {
        const data = JSON.parse(ev.data);
        this.emit('message', data);
      } catch {
        // ignore malformed messages
      }
    };

    this.ws.onclose = () => {
      this.emit('close');
      if (!this.manuallyClosed) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = (err) => {
      this.emit('error', err);
      this.ws?.close();
    };
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxAttempts) return;
    const delay = this.backoffBase * 2 ** this.reconnectAttempts + Math.random() * 200;
    this.reconnectAttempts += 1;
    setTimeout(() => this.connect(), delay);
  }

  private flushQueue() {
    while (this.messageQueue.length) {
      const msg = this.messageQueue.shift()!;
      this.send(msg);
    }
  }

  public send(message: WSMessage) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  public close() {
    this.manuallyClosed = true;
    this.ws?.close();
  }
}
