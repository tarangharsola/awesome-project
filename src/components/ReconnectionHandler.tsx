{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface ReconnectionHandlerProps {
  editor: useEditor;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ editor }) => {
  const [reconnecting, setReconnecting] = useState(false);

  useEffect(() => {
    const handleReconnect = () => {
      setReconnecting(true);
    };

    editor.on('reconnect', handleReconnect);

    return () => {
      editor.off('reconnect', handleReconnect);
    };
  }, []);

  return (
    <div>
      {reconnecting ? 'Reconnecting...' : ''}
    </div>
  );
};

export default ReconnectionHandler;