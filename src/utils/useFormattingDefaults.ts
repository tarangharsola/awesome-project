{"import { useState } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState<FormattingDefaults>({ tabSize: 2, indentSize: 2 });

  const updateFormattingDefaults = (tabSize: number, indentSize: number) => {
    setFormattingDefaults({ tabSize, indentSize });
  };

  return { formattingDefaults, updateFormattingDefaults };

  return useFormattingDefaults;
}

export default useFormattingDefaults;