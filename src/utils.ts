{"import { WebSocket } from 'ws';

const ws = new WebSocket('ws://localhost:8080');

export const send = (message: any) => {
  ws.send(JSON.stringify(message));
};

export const receive = (callback: (message: any) => void) => {
  ws.onmessage = (event) => callback(JSON.parse(event.data));
};