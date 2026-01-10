{"import React from 'react';
import { useEditor } from './useEditor';

interface ReconnectionHandlerProps {
  editor: useEditor;
}

const ReconnectionHandler = ({ editor }: ReconnectionHandlerProps) => {
  const { reconnect } = editor;
  useEffect(() => {
    reconnect(() => console.log('Reconnected!'));
    return () => console.log('Disconnected.');
  }, []);
  return <div>Reconnection status: {editor.isConnected ? 'connected' : 'disconnected'}</div>;
};

export default ReconnectionHandler;