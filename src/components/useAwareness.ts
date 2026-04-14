{"import { useState, useEffect } from 'react';
import { useEditor } from './useEditor';

interface Awareness {
  updatePresence: (presence: any) => void;
}

const useAwareness = (): Awareness => {
  const [presence, setPresence] = useState({ users: [] });
  const editor = useEditor();

  useEffect(() => {
    const handlePresenceUpdate = (presence) => {
      setPresence(presence);
      editor.updatePresence(presence);
    };

    editor.on('presenceUpdate', handlePresenceUpdate);

    return () => editor.off('presenceUpdate', handlePresenceUpdate);
  }, [editor]);

  return { updatePresence: (presence) => setPresence(presence) };
};

export default useAwareness;