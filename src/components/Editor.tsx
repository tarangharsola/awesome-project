import React, { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from '@codemirror/basic-setup';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { html } from '@codemirror/lang-html';
import { useCollaboration } from '../hooks/useCollaboration';
import { useFormattingDefaults } from '../utils/useFormattingDefaults';
import { useKeyboardShortcuts } from '../utils/useKeyboardShortcuts';
import { getLanguageExtension } from '../utils/editorExtensions';

type Props = {
  language: string;
};

const Editor: React.FC<Props> = ({ language }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const { doc, applyRemoteChanges, sendLocalChange } = useCollaboration();
  const formattingDefaults = useFormattingDefaults();
  const keyboardShortcuts = useKeyboardShortcuts(sendLocalChange);

  useEffect(() => {
    if (!editorRef.current) return;

    const startState = EditorState.create({
      doc,
      extensions: [
        basicSetup,
        formattingDefaults,
        keyboardShortcuts,
        getLanguageExtension(language),
        EditorView.updateListener.of((v) => {
          if (v.docChanged) {
            const newDoc = v.state.doc.toString();
            sendLocalChange(newDoc);
          }
        }),
      ],
    });

    const view = new EditorView({ state: startState, parent: editorRef.current });

    const unsubscribe = applyRemoteChanges((remoteDoc: string) => {
      const transaction = view.state.update({ changes: { from: 0, to: view.state.doc.length, insert: remoteDoc } });
      view.dispatch(transaction);
    });

    return () => {
      view.destroy();
      unsubscribe();
    };
  }, [language, doc, formattingDefaults, keyboardShortcuts, applyRemoteChanges, sendLocalChange]);

  return <div className="code-editor" ref={editorRef} />;
};

export default Editor;
