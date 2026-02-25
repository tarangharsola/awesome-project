{"import React from 'react';
import { useLanguage } from './useLanguage';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor = ({ value, onChange, language }) => {
  const { syntaxHighlighting } = useLanguage(language);
  return (
    <div className="editor" style={{
      backgroundColor: syntaxHighlighting.backgroundColor,
      color: syntaxHighlighting.foregroundColor
    }}>
      <pre>{value}</pre>
    </div>
  );
}

export default Editor;