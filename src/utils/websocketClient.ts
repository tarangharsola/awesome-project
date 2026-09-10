// src/utils/websocketClient.ts
type MessageHandler = (msg: any) => void;
type StatusHandler = () => void;

interface WSClientOptions {
  url: string;
  onMessage: MessageHandler;
  onOpen?: StatusHandler;
  onClose?: StatusHandler;
}

class WSClient {
  private url: string;
  private onMessage: MessageHandler;
  private onOpen?: StatusHandler;
  private onClose?: StatusHandler;
  private socket: WebSocket | null = null;
  private messageQueue: string[] = [];
  private reconnectAttempts = 0;
  private readonly maxBackoff = 30000; // 30s

  constructor(opts: WSClientOptions) {
    this.url = opts.url;
    this.onMessage = opts.onMessage;
    this.onOpen = opts.onOpen;
    this.onClose = opts.onClose;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);
    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('message', this.handleMessage);
    this.socket.addEventListener('close', this.handleClose);
    this.socket.addEventListener('error', this.handleClose);
  }

  private handleOpen = () => {
    this.reconnectAttempts = 0;
    this.flushQueue();
    if (this.onOpen) this.onOpen();
  };

  private handleMessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data);
      this.onMessage(data);
    } catch {
      // ignore malformed messages
    }
  };

  private handleClose = () => {
    if (this.onClose) this.onClose();
    this.scheduleReconnect();
  };

  private scheduleReconnect() {
    this.reconnectAttempts += 1;
    const backoff = Math.min(1000 * 2 ** this.reconnectAttempts, this.maxBackoff);
    setTimeout(() => this.connect(), backoff);
  }

  private flushQueue() {
    while (this.messageQueue.length && this.socket && this.socket.readyState === WebSocket.OPEN) {
      const msg = this.messageQueue.shift()!;
      this.socket.send(msg);
    }
  }

  public send(msg: any) {
    const payload = JSON.stringify(msg);
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(payload);
    } else {
      this.messageQueue.push(payload);
    }
  }

  public close() {
    if (this.socket) {
      this.socket.removeEventListener('open', this.handleOpen);
      this.socket.removeEventListener('message', this.handleMessage);
      this.socket.removeEventListener('close', this.handleClose);
      this.socket.removeEventListener('error', this.handleClose);
      this.socket.close();
    }
  }
}

export default WSClient;
