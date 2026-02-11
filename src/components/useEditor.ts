import { useState, useEffect } from 'react';

interface useEditorProps {
  editor: any;
  webSocket: any;
}

const useEditor = ({ editor, webSocket }: useEditorProps) => {
  const [state, setState] = useState({ text: '', cursor: { position: 0 } });
  const { send } = webSocket;

  useEffect(() => {
    const handleTextChange = (text: any) => {
      setState({ text, cursor: state.cursor });
    };

    send({ type: 'textChange', text });
    return () => {
      send({ type: 'textChange', text: null });
    };
  }, [send]);

  return { state, dispatch: setState };
};

export default useEditor;