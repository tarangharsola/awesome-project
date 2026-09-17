import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
}

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    onLanguageChange(newLang);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">{t('language')}:</label>
      <select id="language-select" value={selectedLanguage} onChange={handleChange}>
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};
