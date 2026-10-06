export type WebSocketClientOptions = {
  url?: string;
  onOpen?: () => void;
  onMessage?: (event: MessageEvent) => void;
  onClose?: () => void;
  onError?: (event: Event) => void;
};

export interface WebSocketClient {
  send: (data: string) => void;
  close: () => void;
}

export const createWebSocketClient = (options: WebSocketClientOptions): WebSocketClient => {
  const wsUrl = options.url ?? `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}/ws`;
  const ws = new WebSocket(wsUrl);

  ws.onopen = () => {
    options.onOpen?.();
  };

  ws.onmessage = (e) => {
    options.onMessage?.(e);
  };

  ws.onclose = () => {
    options.onClose?.();
  };

  ws.onerror = (e) => {
    options.onError?.(e);
  };

  return {
    send: (data: string) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    },
    close: () => {
      ws.close();
    },
  };
};