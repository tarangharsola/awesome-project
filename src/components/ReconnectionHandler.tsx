{"import React from 'react';
import { useEditor } from './useEditor';

interface ReconnectionHandlerProps {
  editor: any;
  children: React.ReactNode;
}

const ReconnectionHandler = ({ editor, children }: ReconnectionHandlerProps) => {
  const { reconnection } = useEditor(editor);
  return (
    <div>
      {children}
      <div>Reconnection: {reconnection}</div>
    </div>
  );
}

export default ReconnectionHandler;