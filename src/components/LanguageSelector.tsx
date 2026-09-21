import React from 'react';

type Language = 'javascript' | 'python' | 'html';

interface Props {
  language: Language;
  onChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<Props> = ({ language, onChange }) => {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value as Language)}
      aria-label="Select language"
      className="language-selector"
    >
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};