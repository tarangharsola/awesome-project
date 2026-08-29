import React from 'react';

type Props = {
  language: 'javascript' | 'python' | 'html';
  onChange: (lang: 'javascript' | 'python' | 'html') => void;
};

const LanguageSelector: React.FC<Props> = ({ language, onChange }) => {
  return (
    <select
      value={language}
      onChange={(e) => onChange(e.target.value as 'javascript' | 'python' | 'html')}
      aria-label="Language selector"
    >
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};

export default LanguageSelector;
