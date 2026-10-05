import React from "react";
import { useLanguage } from "../utils/useLanguage";

export const LanguageSelector: React.FC = () => {
  const [language, setLanguage] = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as any);
  };

  return (
    <select value={language} onChange={handleChange} className="language-selector">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};
