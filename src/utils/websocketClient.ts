import { WebSocketMessage } from '../types/websocketMessage';

type WSHandlers = {
  onOpen?: () => void;
  onClose?: () => void;
  onMessage?: (event: MessageEvent) => void;
};

/**
 * Establishes a WebSocket connection with typed event handlers.
 * Returns the underlying WebSocket instance for further interaction.
 */
export const connectWebSocket = (url: string, handlers: WSHandlers): WebSocket => {
  const ws = new WebSocket(url);
  ws.onopen = () => handlers.onOpen?.();
  ws.onclose = () => handlers.onClose?.();
  ws.onmessage = (event) => handlers.onMessage?.(event);
  return ws;
};

/**
 * Sends a typed message over an open WebSocket connection.
 */
export const sendMessage = (ws: WebSocket, msg: WebSocketMessage): void => {
  ws.send(JSON.stringify(msg));
};