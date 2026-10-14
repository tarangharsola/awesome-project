import React from 'react';
import { useLanguage } from '../utils/useLanguage';

/**
 * Dropdown component for selecting the editor language.
 * Updates the global language state via the useLanguage hook.
 */
const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'javascript' | 'python' | 'html');
  };

  return (
    <select value={language} onChange={handleChange} className="language-selector">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};

export default LanguageSelector;
