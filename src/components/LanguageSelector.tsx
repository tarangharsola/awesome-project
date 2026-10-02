import React from 'react';
import { useCollaboration } from '../hooks/useCollaboration';

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' }
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useCollaboration();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
  };

  return (
    <select value={language} onChange={handleChange} aria-label="Language selector">
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};