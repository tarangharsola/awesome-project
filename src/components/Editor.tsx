{"import React, { useState, useEffect } from 'react';
import { useEditor } from './useEditor';
import { useLanguage } from './useLanguage';
import LanguageSelector from './LanguageSelector';

interface EditorProps {
  language: string;
  onChange: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({ language, onChange }) => {
  const [code, setCode] = useState('');
  const { formatCode } = useEditor();
  const { language: selectedLanguage } = useLanguage();

  useEffect(() => {
    if (selectedLanguage !== language) {
      onChange(formatCode(code, language));
    }
  }, [selectedLanguage, language, code]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onChange(newCode);
  };

  return (
    <div>
      <LanguageSelector languages={['JavaScript', 'Python', 'HTML']} selectedLanguage={language} onChange={handleLanguageChange} />
      <textarea value={code} onChange={(e) => handleCodeChange(e.target.value)} />
    </div>
  );

  function handleLanguageChange(language: string) {
    onChange(formatCode(code, language));
  }

  return Editor;
}
export default Editor;