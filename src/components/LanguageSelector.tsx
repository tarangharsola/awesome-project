import React from 'react';
import { useLanguage } from '../utils/useLanguage';
import styles from '../styles/user.module.css';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
  };

  return (
    <select
      className={styles.languageSelector}
      value={language}
      onChange={handleChange}
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};