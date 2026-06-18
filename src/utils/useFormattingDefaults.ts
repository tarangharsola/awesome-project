{"import { useState } from 'react';

const useFormattingDefaults = () => {
  const [defaults, setDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    newline: '\n'
  });

  return defaults;
};

export default useFormattingDefaults;