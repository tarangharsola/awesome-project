{"import { useState, useEffect } from 'react';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';

const useLanguage = () => {
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const view = new EditorView({ state: EditorState.create() });
    const language = view.state.doc.toString();
    setLanguage(language);
  }, []);

  return language;
};

export default useLanguage;