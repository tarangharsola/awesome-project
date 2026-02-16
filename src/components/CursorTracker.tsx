{"import React, { useState, useEffect } from 'react';
import { EditorView } from 'prosemirror-view';
import { CursorTracker } from './CursorTracker';

interface Props {
  view: EditorView;
  userId: string;
}

const CursorTrackerComponent: React.FC<Props> = ({ view, userId }) => {
  const [cursorPosition, setCursorPosition] = useState(view.state.selection.from);
  const [cursorColor, setCursorColor] = useState(`#${Math.floor(Math.random() * 16777215).toString(16)}`);

  useEffect(() => {
    const handleStateChange = () => {
      setCursorPosition(view.state.selection.from);
    };
    view.dispatch({ type: 'set_selection', selection: view.state.selection });
    return () => {
      view.destroy();
    };
  }, [view.state.selection, view.state.selection.from]);

  return (
    <div className="cursor" style={{
      left: `${cursorPosition}px`,
      backgroundColor: cursorColor,
    }}>
      {userId}
    </div>
  );
}

export default CursorTrackerComponent;