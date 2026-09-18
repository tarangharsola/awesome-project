import React from 'react';
import './LanguageSelector.css';

type Props = {
  selected: string;
  onChange: (lang: string) => void;
};

const languages = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'html', label: 'HTML' },
];

const LanguageSelector: React.FC<Props> = ({ selected, onChange }) => (
  <div className="language-selector">
    <label htmlFor="language-select">Language:</label>
    <select
      id="language-select"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Select programming language"
    >
      {languages.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  </div>
);

export default LanguageSelector;
