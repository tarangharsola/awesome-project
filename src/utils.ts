{"import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:8080');

export function connectWebSocket() {
  return new Promise((resolve, reject) => {
    ws.onmessage = (event) => {
      resolve(JSON.parse(event.data));
    };
    ws.onerror = (event) => {
      reject(event);
    };
  });
}

export function disconnectWebSocket() {
  ws.close();
}