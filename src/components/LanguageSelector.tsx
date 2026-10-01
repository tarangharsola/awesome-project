import React from 'react';
import { useLanguage, Language } from '../utils/useLanguage';

/**
 * Dropdown allowing the user to switch the editor language.
 * The selected language is stored via the `useLanguage` hook.
 */
const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <select
      value={language}
      onChange={handleChange}
      aria-label="Select programming language"
      style={{ marginLeft: '1rem', padding: '0.25rem' }}
    >
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};

export default LanguageSelector;
