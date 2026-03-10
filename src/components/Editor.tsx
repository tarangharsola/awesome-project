{"import React from 'react';
import { useState } from 'react';
import { useEditor } from './useEditor';
import LanguageSelector from './LanguageSelector';

interface Props {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor = ({ value, onChange, language }: Props) => {
  const { value: editorValue, onChange: handleEditorChange, language: languageValue, handleLanguageChange, handleFormat, handleKeyDown } = useEditor({ value, onChange, language });

  return (
    <div>
      <textarea value={editorValue} onChange={(event) => handleEditorChange(event.target.value)} onKeyDown={handleKeyDown} />
      <LanguageSelector language={languageValue} onChange={handleLanguageChange} />
      <button onClick={handleFormat}>Format</button>
    </div>
  );
};

export default Editor;