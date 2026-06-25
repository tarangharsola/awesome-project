{"import { useState, useEffect } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

interface UseFormattingDefaultsProps {
  defaults: FormattingDefaults;
}

const useFormattingDefaults = ({ defaults }: UseFormattingDefaultsProps) => {
  const [tabSize, setTabSize] = useState(defaults.tabSize);
  const [indentSize, setIndentSize] = useState(defaults.indentSize);

  useEffect(() => {
    const handleDefaultsChange = (defaults: FormattingDefaults) => {
      setTabSize(defaults.tabSize);
      setIndentSize(defaults.indentSize);
    };

    return () => {
      // Clean up
    };
  }, []);

  return { tabSize, indentSize, setTabSize, setIndentSize };
}
export default useFormattingDefaults;