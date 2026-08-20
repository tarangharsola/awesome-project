import React, { useCallback, useEffect } from 'react';
import { useEditor } from '../utils/useEditor';
import useLanguage from '../utils/useLanguage';
import getFormattingDefaults from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { useDispatch } from 'react-redux';
import { updateDocument } from '../store/editorReducer';

const Editor = () => {
  const dispatch = useDispatch();
  const { language, changeLanguage } = useLanguage();
  const formatting = getFormattingDefaults(language);
  const { editorView, setValue } = useEditor({ language, formatting });

  const handleSave = useCallback(() => {
    const content = editorView?.state.doc.toString() ?? '';
    dispatch(updateDocument(content));
  }, [editorView, dispatch]);

  const handleFormat = useCallback(() => {
    const content = editorView?.state.doc.toString() ?? '';
    const formatted = content
      .split('\n')
      .map((line) => line.replace(/\s+$/g, ''))
      .join('\n');
    setValue(formatted);
  }, [editorView, setValue]);

  useKeyboardShortcuts(editorView, { save: handleSave, format: handleFormat });

  // Reconfigure editor when language changes
  useEffect(() => {
    if (!editorView) return;
    const { languageSupport } = require('../utils/editorExtensions');
    const langExt = languageSupport(language);
    editorView.dispatch({
      effects: editorView.state.reconfigure(langExt),
    });
  }, [editorView, language]);

  return <div id="editor" ref={editorView?.dom?.parentNode ? undefined : null} />;
};

export default Editor;
