{"import React from 'react';
import { useState, useEffect } from 'react';
import { Editor } from 'slate-react';
import { EditorProps } from 'slate-react';

interface EditorState {
  value: string;
  language: string;
}

const EditorComponent = ({
  value,
  onChange,
  language,
  children,
}: EditorProps<EditorState>) => {
  const [state, setState] = useState(value);
  const [languageState, setLanguageState] = useState(language);

  useEffect(() => {
    setState(value);
    setLanguageState(language);
  }, [value, language]);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguageState(newLanguage);
  };

  return (
    <div>
      <select value={languageState} onChange={(e) => handleLanguageChange(e.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
      <Editor
        value={state}
        onChange={onChange}
        language={languageState}
      />
      {children}
    </div>
  );
}

export default EditorComponent;