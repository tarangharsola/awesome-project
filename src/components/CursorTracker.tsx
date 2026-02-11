import React from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface CursorTrackerProps {
  editor: any;
  webSocket: any;
}

const CursorTracker: React.FC<CursorTrackerProps> = ({ editor, webSocket }) => {
  const { state, dispatch } = useEditor();
  const { send } = useWebSocket();

  const handleCursorMove = (cursor: any) => {
    send({ type: 'cursorMove', cursor });
  };

  return (
    <div>
      <h2>Cursor Tracker</h2>
      <p>Current cursor position: {state.cursor.position}</p>
      <button onClick={() => handleCursorMove({ position: 10 })}>Move cursor</button>
    </div>
  );
};

export default CursorTracker;