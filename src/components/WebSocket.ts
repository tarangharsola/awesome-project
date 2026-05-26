{"import WebSocket from 'ws';

class WebSocket {
  constructor(url) {
    this.ws = new WebSocket(url);
  }

  onUserJoin(callback) {
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        callback(data.users);
      }
    };
  }

  onUserLeave(callback) {
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'users') {
        callback(data.users);
      }
    };
  }
}

export default WebSocket;