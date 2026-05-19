{"import React from 'react';
import { useLanguage } from './useLanguage';

const LanguageSelector = () => {
  const language = useLanguage();
  return (
    <select value={language} onChange={(e) => {
      // Update language
    }}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
}

export default LanguageSelector;