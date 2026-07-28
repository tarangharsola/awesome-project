{"import { useState } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = () => {
  const [defaults, setDefaults] = useState<FormattingDefaults>({ tabSize: 2, indentSize: 2 });

  return defaults;
}

export default useFormattingDefaults;