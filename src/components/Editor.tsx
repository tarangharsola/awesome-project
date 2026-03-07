{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor as CodeMirror } from 'react-codemirror-editor';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/mark-folded-code';
import 'codemirror/addon/search/match-highlighter';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/dialog/dialog';
import 'codemirror/addon/search/search';
import 'codemirror/keymap/sublime';
import 'codemirror/keymap/vim';

const languages = {
  javascript: 'javascript',
  python: 'python',
  html: 'htmlmixed',
};

const Editor = () => {
  const [language, setLanguage] = useState('javascript');
  const [value, setValue] = useState('');
  const [options, setOptions] = useState({
    lineNumbers: true,
    mode: languages[language],
    theme: 'monokai',
    extraKeys: {
      'Ctrl-Space': 'autocomplete',
      'Ctrl-Shift-Space': 'show-hint',
    },
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault();
        setValue(value + '
');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLanguageChange = (language) => {
    setLanguage(language);
    setOptions((prevOptions) => ({ ...prevOptions, mode: languages[language] }));
  };

  return (
    <div>
      <select value={language} onChange={(event) => handleLanguageChange(event.target.value)}>
        {Object.keys(languages).map((language) => (
          <option key={language} value={language}>{language}</option>
        ))}
      </select>
      <CodeMirror
        value={value}
        onChange={(value) => setValue(value)}
        options={options}
      />
    </div>
  );
};

export default Editor;