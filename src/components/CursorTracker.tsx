{"import React, { useState, useEffect } from 'react';
import { Editor } from 'slate-react';
import { OperationalTransform } from 'ot-react';

const CursorTracker = () => {
  const [editor, setEditor] = useState(new Editor());
  const [ot, setOt] = useState(new OperationalTransform());
  const [cursors, setCursors] = useState({});

  useEffect(() => {
    const handleChanges = (changes) => {
      setOt((prevOt) => prevOt.apply(changes));
      setEditor((prevEditor) => prevEditor.applyChanges(changes));
    };

    const handleCursorUpdate = (cursor) => {
      setCursors((prevCursors) => {
        return {
          ...prevCursors,
          [cursor.userId]: cursor,
        };
      });
    };

    setEditor((prevEditor) => {
      prevEditor.on('changes', handleChanges);
      prevEditor.on('cursorUpdate', handleCursorUpdate);
      return prevEditor;
    });

    return () => {
      setEditor((prevEditor) => {
        prevEditor.off('changes', handleChanges);
        prevEditor.off('cursorUpdate', handleCursorUpdate);
        return prevEditor;
      });
    };
  }, []);

  return {
    cursors,
  };
};
export default CursorTracker;