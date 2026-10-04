import React from 'react';
import './ConnectionStatus.css';

interface ConnectionStatusProps {
  status: 'connected' | 'disconnected' | 'reconnecting';
  attempt?: number;
  onRetry?: () => void;
}

const statusColors: Record<string, string> = {
  connected: '#4caf50',
  disconnected: '#f44336',
  reconnecting: '#ff9800',
};

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ status, attempt, onRetry }) => {
  const color = statusColors[status] || '#777';
  const label =
    status === 'connected'
      ? 'Connected'
      : status === 'disconnected'
      ? 'Disconnected'
      : `Reconnecting${attempt ? ` (attempt ${attempt})` : ''}`;

  return (
    <div className="connection-status" style={{ backgroundColor: color }} title={label}>
      <span className="status-label">{label}</span>
      {status === 'disconnected' && onRetry && (
        <button className="retry-button" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
};
