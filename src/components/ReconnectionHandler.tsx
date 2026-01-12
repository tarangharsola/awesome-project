{"import React from 'react';
import { useEditor } from './useEditor';

interface ReconnectionHandlerProps {
  editor: useEditor;
}

const ReconnectionHandler = ({ editor }: ReconnectionHandlerProps) => {
  const { state, dispatch } = editor;
  const { reconnecting } = state;

  const handleReconnect = () => {
    dispatch({ type: 'RECONNECT' });
  };

  return (
    <div>
      {reconnecting ? (
        <button onClick={handleReconnect}>Reconnect</button>
      ) : (
        <div>Connected</div>
      )}
    </div>
  );

  return handleReconnect;
};

export default ReconnectionHandler;