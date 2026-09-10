import React from 'react';
import { Language } from '../types/editor';

type Props = {
  language: Language;
  onChange: (lang: Language) => void;
};

const languages: Language[] = ['javascript', 'python', 'html'];

export const LanguageSelector: React.FC<Props> = ({ language, onChange }) => (
  <select
    value={language}
    onChange={e => onChange(e.target.value as Language)}
    aria-label="Select language"
    className="language-selector"
  >
    {languages.map(lang => (
      <option key={lang} value={lang}>
        {lang.charAt(0).toUpperCase() + lang.slice(1)}
      </option>
    ))}
  </select>
);

export default LanguageSelector;
