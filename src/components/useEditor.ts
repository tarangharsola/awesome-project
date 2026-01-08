{"import { useState, useEffect } from 'react';

interface EditorState {
  value: string;
  language: string;
}

const useEditor = (initialValue: string, onChange: (value: string) => void) => {
  const [state, setState] = useState<EditorState>({ value: initialValue, language: 'javascript' });

  useEffect(() => {
    onChange(state.value);
  }, [state.value, onChange]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      setState({ ...state, value: state.value + '\n' });
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Shift') {
      setState({ ...state, language: event.shiftKey ? 'python' : 'javascript' });
    }
  };

  return {
    editorRef: React.createRef<HTMLDivElement>(),
    handleKeyDown,
    handleKeyUp,
  };
}

export default useEditor;