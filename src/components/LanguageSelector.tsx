import React from 'react';
import './LanguageSelector.css';

type LanguageOption = {
  label: string;
  value: string;
};

const options: LanguageOption[] = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'HTML', value: 'html' },
];

type Props = {
  selectedLanguage: string;
  onLanguageChange: (lang: string) => void;
};

const LanguageSelector: React.FC<Props> = ({ selectedLanguage, onLanguageChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onLanguageChange(e.target.value);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Language:</label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={handleChange}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
