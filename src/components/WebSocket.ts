{"import WebSocket from 'ws';

class WebSocketComponent {
  constructor(url) {
    this.ws = new WebSocket(url);
  }

  send(message) {
    this.ws.send(JSON.stringify(message));
  }

  onMessage(callback) {
    this.ws.onmessage = callback;
  }

  close() {
    this.ws.close();
  }
}

export default WebSocketComponent;