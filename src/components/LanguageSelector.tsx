import React from "react";
import { Language } from "../utils/useLanguage";

interface LanguageSelectorProps {
  current: Language;
  onChange: (lang: Language) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ current, onChange }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Language;
    onChange(value);
  };

  return (
    <select value={current} onChange={handleSelect} className="language-selector">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};
