import React from 'react';
import { useLanguage } from '../utils/useLanguage';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

export const LanguageSelector: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value as typeof language;
    changeLanguage(selected);
  };

  return (
    <select
      id="language-selector"
      value={language}
      onChange={handleChange}
      style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: 'none', padding: '4px 8px', borderRadius: '4px' }}
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
