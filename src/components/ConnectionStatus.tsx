import React from 'react';
import { ConnectionStatus } from '../types/connectionStatus';
import './ConnectionStatus.css';

interface Props {
  status: ConnectionStatus;
}

export const ConnectionStatus: React.FC<Props> = ({ status }) => {
  const getLabel = () => {
    switch (status) {
      case ConnectionStatus.Connected:
        return 'Connected';
      case ConnectionStatus.Reconnecting:
        return 'Reconnecting...';
      case ConnectionStatus.Disconnected:
      default:
        return 'Disconnected';
    }
  };

  const getClassName = () => {
    switch (status) {
      case ConnectionStatus.Connected:
        return 'status connected';
      case ConnectionStatus.Reconnecting:
        return 'status reconnecting';
      case ConnectionStatus.Disconnected:
      default:
        return 'status disconnected';
    }
  };

  return <div className={getClassName()}>{getLabel()}</div>;
};
