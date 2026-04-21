{"import React from 'react';
import { useLanguage } from './useLanguage';

function LanguageSelector() {
  const language = useLanguage();
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
}

export default LanguageSelector;