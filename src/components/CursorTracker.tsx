{"import React, { useState, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';

interface Props {
  view: EditorView;
}

const CursorTracker = ({ view }: Props) => {
  const [cursorPosition, setCursorPosition] = useState(view.state.selection.from);
  useEffect(() => {
    const handleCursorChange = () => {
      setCursorPosition(view.state.selection.from);
    };
    view.dispatch({ type: 'change', state: handleCursorChange });
    return () => {
      view.destroy();
    };
  }, [view]);
  return <div style={{ position: 'absolute', left: cursorPosition, top: 0, width: 2, height: '100%', backgroundColor: 'red' }} />;
};

export default CursorTracker;