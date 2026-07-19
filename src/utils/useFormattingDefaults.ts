{"import { useState } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = () => {
  const [defaults, setDefaults] = useState<FormattingDefaults>({ tabSize: 2, indentSize: 2 });

  const updateDefaults = (tabSize: number, indentSize: number) => {
    setDefaults({ tabSize, indentSize });
  };

  return { defaults, updateDefaults };
}
export default useFormattingDefaults;