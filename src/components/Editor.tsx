{"import React from 'react';
import { useEditor } from './useEditor';
import { useCursor } from './useCursor';
import CursorTracker from './CursorTracker';

interface Props {
  documentId: string;
}

const Editor: React.FC<Props> = ({ documentId }) => {
  const { document, setDocument } = useEditor(documentId);
  const cursor = useCursor(document.cursorId);
  return (
    <div style={{
      position: 'relative',
      width: 800,
      height: 600,
    }}>
      <CursorTracker cursor={cursor} />
      <div style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        width: 2,
        height: 10,
        backgroundColor: 'blue',
      }} />
      <textarea value={document.text} onChange={(event) => setDocument({ ...document, text: event.target.value })} style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: 800,
        height: 600,
      }} />
    </div>
  );
}

export default Editor;