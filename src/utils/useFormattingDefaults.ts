{"import { useState } from 'react';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    newline: '\n'
  });

  return formattingDefaults;
};

export default useFormattingDefaults;