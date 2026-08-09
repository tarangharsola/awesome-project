{"import React from 'react';
import { useLanguage } from '../utils/useLanguage';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      <option value='javascript'>JavaScript</option>
      <option value='python'>Python</option>
      <option value='html'>HTML</option>
    </select>
  );
};

export default LanguageSelector;