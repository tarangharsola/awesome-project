import React from 'react';
import { useEditor } from './useEditor';
import { useWebSocket } from './useWebSocket';

interface ConflictResolverProps {
  editor: any;
  webSocket: any;
}

const ConflictResolver: React.FC<ConflictResolverProps> = ({ editor, webSocket }) => {
  const { state, dispatch } = useEditor();
  const { send } = useWebSocket();

  const handleConflict = (conflict: any) => {
    send({ type: 'conflict', conflict });
  };

  return (
    <div>
      <h2>Conflict Resolver</h2>
      <p>Current conflict: {state.conflict}</p>
      <button onClick={() => handleConflict({ type: 'merge' })}>Resolve conflict</button>
    </div>
  );
};

export default ConflictResolver;