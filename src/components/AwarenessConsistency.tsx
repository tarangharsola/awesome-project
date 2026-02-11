import React from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface AwarenessConsistencyProps {
  editor: any;
  webSocket: any;
}

const AwarenessConsistency: React.FC<AwarenessConsistencyProps> = ({ editor, webSocket }) => {
  const { state, dispatch } = useEditor();
  const { send } = useWebSocket();

  const handleCursorMove = (cursor: any) => {
    send({ type: 'cursorMove', cursor });
  };

  return (
    <div>
      <h2>Awareness Consistency</h2>
      <p>Current cursor position: {state.cursor.position}</p>
      <button onClick={() => handleCursorMove({ position: 10 })}>Move cursor</button>
    </div>
  );
};

export default AwarenessConsistency;