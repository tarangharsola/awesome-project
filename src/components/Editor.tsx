import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setContent } from '../store/editorActions';
import { attachKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { setLanguageMode } from '../utils/editorHelpers';
import { getDefaultFormatting } from '../utils/useFormattingDefaults';
import CodeMirror from 'codemirror';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/lib/codemirror.css';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const { content, language } = useSelector((state: RootState) => state.editor);
  const editorRef = useRef<HTMLDivElement>(null);
  const cmInstanceRef = useRef<CodeMirror.EditorFromTextArea | null>(null);

  // Initialize CodeMirror
  useEffect(() => {
    if (editorRef.current && !cmInstanceRef.current) {
      const textarea = document.createElement('textarea');
      editorRef.current.appendChild(textarea);
      const cm = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        mode: language,
        theme: 'material-darker',
        ...getDefaultFormatting(language),
      });
      cm.on('change', (instance) => {
        dispatch(setContent(instance.getValue()));
      });
      attachKeyboardShortcuts(cm, dispatch);
      cmInstanceRef.current = cm;
    }
  }, []);

  // Update language mode when language changes
  useEffect(() => {
    const cm = cmInstanceRef.current;
    if (cm) {
      setLanguageMode(cm, language);
      // Apply formatting defaults for the new language
      const formatting = getDefaultFormatting(language);
      cm.setOption('tabSize', formatting.tabSize);
      cm.setOption('indentWithTabs', formatting.indentWithTabs);
    }
  }, [language]);

  // Keep editor content in sync with Redux state (e.g., on load)
  useEffect(() => {
    const cm = cmInstanceRef.current;
    if (cm && cm.getValue() !== content) {
      cm.setValue(content);
    }
  }, [content]);

  return <div ref={editorRef} className="editor-container" />;
};
