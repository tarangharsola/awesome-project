import React, { useEffect, useRef } from 'react';
import useFormattingDefaults from '../utils/useFormattingDefaults';
import useKeyboardShortcuts from '../utils/useKeyboardShortcuts';
import { useCollaboration } from '../hooks/useCollaboration';

interface Props {
  roomId: string;
  language: string;
}

const Editor: React.FC<Props> = ({ roomId, language }) => {
  const editorRef = useRef<any>(null);
  const formatting = useFormattingDefaults(language);
  const { bindCollaboration } = useCollaboration();

  // Apply formatting defaults when language changes
  useEffect(() => {
    if (editorRef.current && typeof editorRef.current.updateOptions === 'function') {
      editorRef.current.updateOptions(formatting);
    }
  }, [formatting]);

  // Register keyboard shortcuts
  useKeyboardShortcuts(editorRef, language);

  // Bind collaboration logic (OT/CRDT) to the editor instance
  useEffect(() => {
    if (editorRef.current) {
      bindCollaboration(editorRef.current, roomId, language);
    }
  }, [roomId, language, bindCollaboration]);

  return <div ref={editorRef} className="editor" style={{ flex: 1 }} />;
};

export default Editor;
