import React, { ChangeEvent } from 'react';
import { useLanguage } from '../utils/useLanguage';
import styles from '../styles/user.module.css';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'javascript' | 'python' | 'html');
  };

  return (
    <select
      className={styles.languageSelect}
      value={language}
      onChange={handleChange}
      aria-label="Language selector"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};
