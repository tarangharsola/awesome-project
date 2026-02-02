import React, { useState, useEffect } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/hint/javascript';
import 'codemirror/addon/hint/html';
import 'codemirror/addon/hint/css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/theme/dracula.css';

const Editor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
      mode: language,
      theme: 'dracula',
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
    });

    editor.on('change', (instance, change) => {
      setCode(instance.getValue());
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
      <textarea id='editor' />
      <select value={language} onChange={handleLanguageChange}>
        <option value='javascript'>JavaScript</option>
        <option value='python'>Python</option>
        <option value='html'>HTML</option>
      </select>
      <pre>{code}</pre>
    </div>
  );
};

export default Editor;