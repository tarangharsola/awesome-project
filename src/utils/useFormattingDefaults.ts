{"import { useState } from 'react';

interface FormattingDefaults {
  indentSize: number;
  tabSize: number;
}

const useFormattingDefaults = () => {
  const [defaults, setDefaults] = useState<FormattingDefaults>({ indentSize: 2, tabSize: 2 });

  const updateDefaults = (newDefaults: FormattingDefaults) => {
    setDefaults(newDefaults);
  };

  return { defaults, updateDefaults };
}
export default useFormattingDefaults;