import React from 'react';

type Language = 'javascript' | 'python' | 'html';

interface Props {
  selected: Language;
  onChange: (lang: Language) => void;
}

const LanguageSelector: React.FC<Props> = ({ selected, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Language;
    onChange(value);
  };

  return (
    <select value={selected} onChange={handleChange} aria-label="Language selector">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};

export default LanguageSelector;
