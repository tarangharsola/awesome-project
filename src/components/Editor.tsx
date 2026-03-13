{"import React from 'react';
import { useState } from 'react';
import LanguageSelector from './LanguageSelector';

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  languages: string[];
  selectedLanguage: string;
}

const Editor: React.FC<EditorProps> = ({ value, onChange, languages, selectedLanguage }) => {
  const [formattedValue, setFormattedValue] = useState(value);

  const handleFormat = () => {
    // Implement formatting logic here
  };

  return (
    <div>
      <LanguageSelector languages={languages} selectedLanguage={selectedLanguage} onSelect={(language) => {
        onChange(language);
        setFormattedValue(language);
      }} />
      <textarea value={formattedValue} onChange={(e) => setFormattedValue(e.target.value)} />
      <button onClick={handleFormat}>Format</button>
    </div>
  );

  return Editor;
}
export default Editor;