{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface ReconnectionHandlerProps {
  editor: useEditor;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ editor }) => {
  const [reconnecting, setReconnecting] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (editor.isConnected) {
        setReconnecting(false);
        clearInterval(intervalId);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [editor.isConnected]);
  return <div>Reconnection Handler</div>;
};

export default ReconnectionHandler;