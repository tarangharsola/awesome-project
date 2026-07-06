{"import { useState } from 'react';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    newline: '\n'
  });

  const handleFormatChange = (event) => {
    setFormattingDefaults({
      ...formattingDefaults,
      [event.target.name]: event.target.value
    });
  };

  return {
    formattingDefaults,
    handleFormatChange
  };
};

export default useFormattingDefaults;