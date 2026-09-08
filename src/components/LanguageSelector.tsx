import React from 'react';

type LanguageSelectorProps = {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
};

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value);
  };

  return (
    <div className="language-selector">
      <label htmlFor="lang-select">Language:</label>
      <select id="lang-select" value={selectedLanguage} onChange={handleChange}>
        {languages.map(lang => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
