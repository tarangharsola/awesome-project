import React from 'react';

type Props = {
  currentLanguage: string;
  onChangeLanguage: (lang: string) => void;
};

const LanguageSelector: React.FC<Props> = ({ currentLanguage, onChangeLanguage }) => {
  const languages = ['javascript', 'python', 'html'];

  return (
    <div className="language-selector">
      <label htmlFor="language-select">Language:</label>
      <select
        id="language-select"
        value={currentLanguage}
        onChange={(e) => onChangeLanguage(e.target.value)}
      >
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang.charAt(0).toUpperCase() + lang.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
