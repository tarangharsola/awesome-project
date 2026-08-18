import React from 'react';

type Status = 'connected' | 'disconnected' | 'reconnecting';

type Props = {
  status: Status;
};

const statusColors: Record<Status, string> = {
  connected: '#4caf50', // green
  disconnected: '#f44336', // red
  reconnecting: '#ff9800', // orange
};

export const ConnectionStatus: React.FC<Props> = ({ status }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    color: statusColors[status],
    padding: '0.25rem 0.5rem',
  }}>
    <span style={{
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: statusColors[status],
      display: 'inline-block',
    }} />
    <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
  </div>
);
