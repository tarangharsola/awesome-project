{"import React, { useState, useEffect } from 'react';
import { useCursor } from './useCursor';
import { useEditor } from './useEditor';
import AwarenessConsistency from './AwarenessConsistency';
import ConflictResolver from './ConflictResolver';
import CursorTracker from './CursorTracker';

interface EditorProps {
  initialContent: string;
}

const Editor = ({ initialContent }: EditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [cursor, setCursor] = useState({ position: 0 });
  const editor = useEditor(content, cursor);
  useEffect(() => {
    const interval = setInterval(() => {
      setContent(content + 'Hello World');
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <AwarenessConsistency editor={editor} />
      <ConflictResolver editor={editor} />
      <CursorTracker editor={editor} />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
    </div>
  );
};

export default Editor;