{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'react-codemirror-editor';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/mark-folded-code';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/display/placeholder';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/mark-folded-code';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/search';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/display/placeholder';

const languages = {
  javascript: 'javascript',
  python: 'python',
  html: 'htmlmixed'
};

const Editor = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [options, setOptions] = useState({
    lineNumbers: true,
    mode: languages[language],
    theme: 'monokai'
  });

  useEffect(() => {
    const editor = CodeMirror.fromTextArea(document.getElementById('editor'), options);
    setValue(editor.getValue());
    return () => {
      editor.toTextArea();
    };
  }, [options]);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setOptions({
      ...options,
      mode: languages[language]
    });
  };

  return (
    <div>
      <select value={language} onChange={(e) => handleLanguageChange(e.target.value)}>
        {Object.keys(languages).map((language) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>
      <textarea id='editor' value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
  );
};

export default Editor;