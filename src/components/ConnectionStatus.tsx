import React from 'react';
import { WebsocketProvider } from 'y-websocket';

interface Props {
  provider: WebsocketProvider;
}

export const ConnectionStatus: React.FC<Props> = ({ provider }) => {
  const [status, setStatus] = React.useState(provider.status);

  React.useEffect(() => {
    const handler = ({ status }: { status: string }) => setStatus(status);
    provider.on('status', handler);
    return () => {
      provider.off('status', handler);
    };
  }, [provider]);

  const color = status === 'connected' ? 'green' : 'red';
  return (
    <div style={{ color }}>
      {status === 'connected' ? 'Connected' : 'Disconnected'}
    </div>
  );
};
