{"import { useState } from 'react';

const useFormattingDefaults = () => {
  const [defaults, setDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    newline: '\n'
  });

  const updateDefaults = (newDefaults) => {
    setDefaults(newDefaults);
  };

  return {
    defaults,
    updateDefaults
  };
};

export default useFormattingDefaults;