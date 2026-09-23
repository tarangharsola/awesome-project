import React from 'react';

type LanguageOption = {
  label: string;
  value: string;
};

const options: LanguageOption[] = [
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'HTML', value: 'html' },
];

interface Props {
  selected: string;
  onChange: (lang: string) => void;
}

const LanguageSelector: React.FC<Props> = ({ selected, onChange }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Language:</label>
      <select id="language-select" value={selected} onChange={handleSelect}>
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
