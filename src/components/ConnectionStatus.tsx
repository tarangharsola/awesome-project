import React from 'react';
import { useWebSocket } from '../utils/hooks/useWebSocket';

type Props = {
  url: string;
  onOpen: () => void;
  onClose: () => void;
};

export const ConnectionStatus: React.FC<Props> = ({ url, onOpen, onClose }) => {
  useWebSocket(url, () => {}, onOpen, onClose);
  return null; // UI handled elsewhere
};