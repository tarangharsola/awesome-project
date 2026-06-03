{"import WebSocket from 'ws';

class WebSocket {
  constructor(url) {
    this.ws = new WebSocket(url);
  }

  send(data) {
    this.ws.send(JSON.stringify(data));
  }

  close() {
    this.ws.close();
  }
}

export default WebSocket;