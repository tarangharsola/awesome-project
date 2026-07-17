{"import { useState } from 'react';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    newline: '\n'
  });

  const updateFormattingDefaults = (newDefaults) => {
    setFormattingDefaults(newDefaults);
  };

  return [formattingDefaults, updateFormattingDefaults];
};

export default useFormattingDefaults;