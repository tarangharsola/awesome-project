import React, { useRef, useMemo } from 'react';
import { EditorView } from '@codemirror/view';
import { basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import useKeyboardShortcuts from '../utils/useKeyboardShortcuts';
import { EditorState } from '@codemirror/state';
import { oneDark } from '@codemirror/theme-one-dark';

type Props = {
  language: string;
};

const languageExtension = (lang: string) => {
  switch (lang) {
    case 'python':
      return python();
    case 'html':
      return html();
    case 'javascript':
    default:
      return javascript();
  }
};

const Editor: React.FC<Props> = ({ language }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const formatting = useFormattingDefaults(language);
  useKeyboardShortcuts(editorRef, language);

  const extensions = useMemo(() => {
    return [
      basicSetup,
      languageExtension(language),
      oneDark,
      EditorView.lineWrapping,
      EditorState.tabSize.of(formatting.tabSize),
    ];
  }, [language, formatting.tabSize]);

  React.useEffect(() => {
    if (!editorRef.current) return;
    const startState = EditorState.create({
      doc: '',
      extensions,
    });
    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });
    return () => {
      view.destroy();
    };
  }, [extensions]);

  return <div className="editor" ref={editorRef} />;
};

export default Editor;
