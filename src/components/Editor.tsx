import React, { useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setContent } from '../store/editorActions';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useEditor } from '../utils/useEditor';

export const Editor: React.FC = () => {
  const dispatch = useDispatch();
  const content = useSelector((state: RootState) => state.editor.content);
  const language = useSelector((state: RootState) => state.editor.language);
  const editorRef = useRef<HTMLDivElement>(null);

  const onChange = useCallback(
    (value: string) => {
      dispatch(setContent(value));
    },
    [dispatch]
  );

  const languageExtension =
    language === 'javascript'
      ? javascript()
      : language === 'python'
      ? python()
      : html();

  const extensions = [
    basicSetup,
    languageExtension,
    EditorView.lineWrapping,
    EditorView.theme({
      '&': {
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
      },
    }),
  ];

  useEditor({
    parent: editorRef.current,
    content,
    extensions,
    onChange,
  });

  useKeyboardShortcuts({ editorRef });

  return <div ref={editorRef} className="editor-container" />;
};