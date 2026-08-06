{"import { useState } from 'react';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    indentSize: 2,
    tabSize: 2
  });
  return formattingDefaults;
};

export default useFormattingDefaults;