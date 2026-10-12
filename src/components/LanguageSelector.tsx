import React from 'react';

type LanguageSelectorProps = {
  language: string;
  onChange: (lang: string) => void;
};

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  language,
  onChange,
}) => {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Select language"
      className="language-selector"
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};