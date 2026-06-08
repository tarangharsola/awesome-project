{"import { useState } from 'react';

interface FormattingDefaults {
  tabSize: number;
  indentSize: number;
}

interface FormattingDefaultsState {
  formattingDefaults: FormattingDefaults | null;
  setFormattingDefaults: (formattingDefaults: FormattingDefaults) => void;
}

const useFormattingDefaults = (): FormattingDefaultsState => {
  const [formattingDefaults, setFormattingDefaults] = useState<FormattingDefaults | null>(null);

  const handleFormattingDefaultsChange = (formattingDefaults: FormattingDefaults) => {
    setFormattingDefaults(formattingDefaults);
  };

  return {
    formattingDefaults,
    setFormattingDefaults: handleFormattingDefaultsChange,
  };
};

export default useFormattingDefaults;