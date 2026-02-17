{"import React, { useState, useEffect } from 'react';
import { Editor } from 'slate-react';
import { OperationalTransform } from 'ot-react';

const useEditor = () => {
  const [editor, setEditor] = useState(new Editor());
  const [ot, setOt] = useState(new OperationalTransform());

  useEffect(() => {
    const handleChanges = (changes) => {
      setOt((prevOt) => prevOt.apply(changes));
      setEditor((prevEditor) => prevEditor.applyChanges(changes));
    };

    const handleReconnection = () => {
      console.log('Reconnected');
    };

    setEditor((prevEditor) => {
      prevEditor.on('changes', handleChanges);
      prevEditor.on('reconnection', handleReconnection);
      return prevEditor;
    });

    return () => {
      setEditor((prevEditor) => {
        prevEditor.off('changes', handleChanges);
        prevEditor.off('reconnection', handleReconnection);
        return prevEditor;
      });
    };
  }, []);

  return { editor, ot };
};
export default useEditor;