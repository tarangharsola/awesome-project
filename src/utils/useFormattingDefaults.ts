import { useState } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState<FormattingDefaults>({ tabSize: 2, indentSize: 2 });

  const updateFormattingDefaults = (newDefaults: FormattingDefaults) => {
    setFormattingDefaults(newDefaults);
  };

  return { formattingDefaults, updateFormattingDefaults };
};

export default useFormattingDefaults;