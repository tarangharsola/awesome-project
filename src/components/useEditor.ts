{"import { useState, useEffect } from 'react';

interface useEditorProps {
  editor: any;
  user: any;
}

const useEditor = ({ editor, user }: useEditorProps) => {
  const [state, setState] = useState({ cursor: [], selection: [] });

  useEffect(() => {
    const handleTextChange = (newText: any) => {
      setState({ ...state, text: newText });
    };

    const handleCursorChange = (newCursor: any) => {
      setState({ ...state, cursor: newCursor });
    };

    const handleSelectionChange = (newSelection: any) => {
      setState({ ...state, selection: newSelection });
    };

    return () => {
      editor.off('textChange', handleTextChange);
      editor.off('cursorChange', handleCursorChange);
      editor.off('selectionChange', handleSelectionChange);
    };
  }, []);

  return { state, dispatch: setState };
}

export default useEditor;