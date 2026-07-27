{"import { useState } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

const useFormattingDefaults = (): FormattingDefaults => {
  const [tabSize, setTabSize] = useState(2);
  const [indentSize, setIndentSize] = useState(2);

  return {
    tabSize,
    indentSize,
  };
};

export default useFormattingDefaults;