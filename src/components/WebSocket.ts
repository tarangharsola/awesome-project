{"import WebSocket from 'ws';

class WebSocket {
  constructor(url) {
    this.url = url;
    this.ws = new WebSocket(url);
  }

  reconnect() {
    this.ws.close();
    this.ws = new WebSocket(this.url);
  }

  get readyState() {
    return this.ws.readyState;
  }
}
export default WebSocket;