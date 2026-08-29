import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';

type Props = {
  language: 'javascript' | 'python' | 'html';
};

const Editor: React.FC<Props> = ({ language }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const formattingExtensions = useFormattingDefaults();
  const shortcutExtension = useKeyboardShortcuts(language);

  useEffect(() => {
    if (!editorRef.current) return;
    const langExtension =
      language === 'javascript' ? javascript() : language === 'python' ? python() : html();
    const extensions = [basicSetup, langExtension, ...formattingExtensions, shortcutExtension];
    const view = new EditorView({
      doc: '',
      extensions,
      parent: editorRef.current,
    });
    return () => view.destroy();
  }, [language, formattingExtensions, shortcutExtension]);

  return <div ref={editorRef} className="editor" />;
};

export default Editor;
