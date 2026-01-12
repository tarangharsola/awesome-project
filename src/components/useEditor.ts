{"import { useState, useEffect } from 'react';

interface useEditorProps {
  editor: any;
}

const useEditor = ({ editor }: useEditorProps) => {
  const [state, setState] = useState({ text: '', cursors: [], users: [] });

  useEffect(() => {
    const handleStateUpdate = (state: any) => {
      setState(state);
    };

    editor.subscribe('UPDATE_STATE', handleStateUpdate);

    return () => {
      editor.unsubscribe('UPDATE_STATE', handleStateUpdate);
    };
  }, [editor]);

  return { state, dispatch: setState };
};

export default useEditor;