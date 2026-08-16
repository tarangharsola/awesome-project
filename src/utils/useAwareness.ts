{"import { useState, useEffect } from 'react';
import { useEditor, useUsers } from './useEditor';
import { useWebSocket } from './useWebSocket';

const useAwareness = () => {
  const [awareness, setAwareness] = useState({});
  const { editorState, dispatch } = useEditor();
  const { users } = useUsers();
  const { webSocket } = useWebSocket();

  useEffect(() => {
    const handleAwarenessUpdate = (awarenessUpdate) => {
      setAwareness((prevAwareness) => ({ ...prevAwareness, ...awarenessUpdate }));
    };

    webSocket.onmessage = (event) => {
      if (event.data.type === 'AWARENESS_UPDATE') {
        handleAwarenessUpdate(event.data.data);
      }
    };
  }, [webSocket]);

  return awareness;
};

export default useAwareness;