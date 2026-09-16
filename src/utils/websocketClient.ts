class WebSocketClient {
  private url: string;
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 10;
  private reconnectDelay = 1000; // start with 1s
  private listeners: { [event: string]: ((...args: any[]) => void)[] } = {};

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.socket = new WebSocket(this.url);
    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('message', this.handleMessage);
    this.socket.addEventListener('close', this.handleClose);
    this.socket.addEventListener('error', this.handleError);
  }

  private handleOpen = () => {
    this.reconnectAttempts = 0;
    this.emit('open');
  };

  private handleMessage = (event: MessageEvent) => {
    this.emit('message', event.data);
  };

  private handleClose = () => {
    this.emit('close');
    this.scheduleReconnect();
  };

  private handleError = (err: Event) => {
    this.emit('error', err);
    // Errors also trigger close; reconnection handled there.
  };

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('WebSocket: max reconnection attempts reached');
      return;
    }
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts);
    this.reconnectAttempts++;
    setTimeout(() => {
      console.info('WebSocket: attempting reconnection', this.reconnectAttempts);
      this.connect();
    }, delay);
  }

  send(data: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    } else {
      console.warn('WebSocket: send called while socket not open, queuing message');
      this.once('open', () => this.send(data));
    }
  }

  close() {
    if (this.socket) {
      this.socket.removeEventListener('open', this.handleOpen);
      this.socket.removeEventListener('message', this.handleMessage);
      this.socket.removeEventListener('close', this.handleClose);
      this.socket.removeEventListener('error', this.handleError);
      this.socket.close();
    }
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event: string, callback: (...args: any[]) => void) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  once(event: string, callback: (...args: any[]) => void) {
    const wrapper = (...args: any[]) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
  }

  private emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(cb => cb(...args));
  }
}

// Export a singleton that can be re-instantiated with a new URL when needed.
let client: WebSocketClient | null = null;
export const initWebSocketClient = (url: string) => {
  if (client) client.close();
  client = new WebSocketClient(url);
  return client;
};
export const getWebSocketClient = () => client;
