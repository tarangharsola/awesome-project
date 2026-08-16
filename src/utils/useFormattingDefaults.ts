{"import { useState } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
  newline: string;
}

const useFormattingDefaults = () => {
  const [defaults, setDefaults] = useState<FormattingDefaults>({ tabSize: 2, indentSize: 2, newline: '\n' });

  return defaults;
}
export default useFormattingDefaults;