type Message = any;

export class WebSocketClient {
  private url: string;
  private socket: WebSocket | null = null;
  private messageQueue: Message[] = [];
  private reconnectAttempts = 0;
  private readonly maxBackoff = 30000;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);
    this.socket.addEventListener('open', this.flushQueue);
    this.socket.addEventListener('close', this.handleClose);
    this.socket.addEventListener('error', this.handleError);
  }

  private flushQueue = () => {
    while (this.messageQueue.length) {
      const msg = this.messageQueue.shift();
      this.socket?.send(JSON.stringify(msg));
    }
    this.reconnectAttempts = 0;
  };

  private scheduleReconnect = () => {
    const backoff = Math.min(1000 * 2 ** this.reconnectAttempts, this.maxBackoff);
    setTimeout(() => {
      this.reconnectAttempts += 1;
      this.connect();
    }, backoff);
  };

  private handleClose = () => {
    this.scheduleReconnect();
  };

  private handleError = () => {
    // Let close handler manage reconnection
    this.socket?.close();
  };

  send(message: Message) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    } else {
      this.messageQueue.push(message);
    }
  }

  getSocket(): WebSocket | null {
    return this.socket;
  }
}
