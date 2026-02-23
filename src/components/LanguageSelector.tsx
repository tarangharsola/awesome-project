{"import React from 'react';
import useLanguage from './useLanguage';

interface Props {
  onChange: (language: string) => void;
  value: string;
}

const LanguageSelector = ({ onChange, value }: Props) => {
  const { language, onChange: handleLanguageChange } = useLanguage({ onChange, value });

  const handleLanguageSelect = (newLanguage: string) => {
    handleLanguageChange(newLanguage);
  };

  return (
    <div className="language-selector">
      <select value={language} onChange={(event) => handleLanguageSelect(event.target.value)}>
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="html">HTML</option>
      </select>
    </div>
  );
};

export default LanguageSelector;