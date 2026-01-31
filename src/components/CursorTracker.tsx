{"import React, { useState, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';

interface Props {
  view: EditorView;
}

const CursorTracker = ({ view }: Props) => {
  const [cursorPosition, setCursorPosition] = useState(view.state.selection.from);
  useEffect(() => {
    const handleCursorChange = () => setCursorPosition(view.state.selection.from);
    view.dispatchStateChange = handleCursorChange;
    return () => {
      view.dispatchStateChange = null;
    };
  }, [view]);
  return <div className="cursor" style={{ left: cursorPosition }} />
};

export default CursorTracker;