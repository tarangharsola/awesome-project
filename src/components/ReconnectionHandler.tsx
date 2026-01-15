{"import React from 'react';
import { useEditor } from './useEditor';

interface ReconnectionHandlerProps {
  editor: useEditor;
}

const ReconnectionHandler: React.FC<ReconnectionHandlerProps> = ({ editor }) => {
  const { reconnect } = editor;
  return (
    <div>
      <button onClick={() => reconnect()}>Reconnect</button>
    </div>
  );
};

export default ReconnectionHandler;