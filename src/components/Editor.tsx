{"import React, { useState, useEffect } from 'react';
import { useCursor } from './useCursor';
import { useEditor } from './useEditor';

interface EditorProps {
  initialContent: string;
}

const Editor: React.FC<EditorProps> = ({ initialContent }) => {
  const [content, setContent] = useState(initialContent);
  const cursor = useCursor();
  const editor = useEditor();

  useEffect(() => {
    editor.setContent(content);
  }, [content]);

  return (
    <div>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <CursorTracker editor={editor} />
      <AwarenessConsistency editor={editor} />
      <ConflictResolver editor={editor} />
    </div>
  );
};

export default Editor;