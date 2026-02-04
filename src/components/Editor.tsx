{"import React from 'react';
import { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/hint/show-hint';

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      theme: 'monokai',
      lineNumbers: true,
      foldGutter: true,
      indentUnit: 4,
      indentWithTabs: false,
      extraKeys: {
        'Ctrl-Space': 'autocomplete',
        'Ctrl-Shift-Space': 'show-hint',
        'Ctrl-Shift-F': 'foldCode',
        'Ctrl-Shift-Shift-F': 'unfoldCode',
      },
    });

    editor.on('change', () => {
      setCode(editor.getValue());
    });

    return () => {
      editor.toTextArea();
    };
  }, [language]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <div>
      <select value={language} onChange={handleLanguageChange}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <textarea id="editor" />
      <pre>{code}</pre>
    </div>
  );
};

export default Editor;