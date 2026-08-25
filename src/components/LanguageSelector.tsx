import React from 'react';
import { Language } from '../types';

type Props = {
  selected: Language;
  onSelect: (lang: Language) => void;
};

const languages: { label: string; value: Language }[] = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'HTML', value: 'html' },
];

export const LanguageSelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <select
      value={selected}
      onChange={e => onSelect(e.target.value as Language)}
      aria-label="Select language"
      className="language-selector"
    >
      {languages.map(l => (
        <option key={l.value} value={l.value}>
          {l.label}
        </option>
      ))}
    </select>
  );
};