import React from "react";

type Props = {
  language: string;
  onChange: (lang: string) => void;
};

const LanguageSelector: React.FC<Props> = ({ language, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select value={language} onChange={handleChange} aria-label="Select language">
      <option value="javascript">JavaScript</option>
      <option value="python">Python</option>
      <option value="html">HTML</option>
    </select>
  );
};

export default LanguageSelector;
