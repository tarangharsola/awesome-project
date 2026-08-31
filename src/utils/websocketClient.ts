import { EventEmitter } from 'events';

interface Message {
  type: string;
  payload?: any;
}

export class WebSocketClient extends EventEmitter {
  private url: string;
  private ws?: WebSocket;
  private reconnectAttempts = 0;
  private readonly maxBackoff = 30000; // 30 seconds
  private readonly baseBackoff = 500; // 0.5 seconds

  constructor(url: string) {
    super();
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);
    this.ws.onopen = () => this.handleOpen();
    this.ws.onmessage = (ev) => this.handleMessage(ev);
    this.ws.onclose = () => this.handleClose();
    this.ws.onerror = () => this.handleError();
  }

  private handleOpen() {
    this.reconnectAttempts = 0;
    this.emit('open');
    // Request full document and awareness sync after (re)connection
    const syncMsg: Message = { type: 'SYNC_REQUEST' };
    this.send(syncMsg);
  }

  private handleMessage(event: MessageEvent) {
    try {
      const data: Message = JSON.parse(event.data);
      this.emit('message', data);
    } catch (e) {
      console.error('Invalid message format', e);
    }
  }

  private handleClose() {
    this.emit('close');
    this.scheduleReconnect();
  }

  private handleError() {
    // Errors are also handled by close event; no extra action needed
  }

  private scheduleReconnect() {
    this.reconnectAttempts += 1;
    const backoff = Math.min(
      this.baseBackoff * 2 ** (this.reconnectAttempts - 1),
      this.maxBackoff
    );
    setTimeout(() => this.connect(), backoff);
  }

  public send(message: Message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not open, dropping message', message);
    }
  }

  public close() {
    this.ws?.close();
  }
}
