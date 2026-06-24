{"import { useState } from 'react';

interface FormattingDefaults {
  indentSize: number;
  tabSize: number;
}

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState<FormattingDefaults>({ indentSize: 2, tabSize: 2 });

  const handleIndentSizeChange = (indentSize: number) => {
    setFormattingDefaults({ ...formattingDefaults, indentSize });
  };

  const handleTabSizeChange = (tabSize: number) => {
    setFormattingDefaults({ ...formattingDefaults, tabSize });
  };

  return {
    formattingDefaults,
    handleIndentSizeChange,
    handleTabSizeChange
  };
};

export default useFormattingDefaults;