import React from 'react';

type LanguageSelectorProps = {
  language: string;
  onChange: (lang: string) => void;
};

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onChange }) => (
  <select
    value={language}
    onChange={(e) => onChange(e.target.value)}
    className="language-selector"
  >
    {languages.map((lang) => (
      <option key={lang.value} value={lang.value}>
        {lang.label}
      </option>
    ))}
  </select>
);

export default LanguageSelector;