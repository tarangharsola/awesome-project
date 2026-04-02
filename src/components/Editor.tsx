{"import React, { useState, useEffect } from 'react';
import { useLanguage } from './useLanguage';
import LanguageSelector from './LanguageSelector';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, language }) => {
  const [formattedValue, setFormattedValue] = useState(value);
  const { formatCode } = useLanguage(language);

  useEffect(() => {
    setFormattedValue(formatCode(value));
  }, [value, language]);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div>
      <textarea value={formattedValue} onChange={handleInputChange} />
      <LanguageSelector languages={['JavaScript', 'Python', 'HTML']} selectedLanguage={language} onChange={setLanguage} />
    </div>
  );

  return Editor;
}

export default Editor;