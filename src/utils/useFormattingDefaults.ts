{"import { useState } from 'react';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({
    tabSize: 2,
    indentSize: 2,
  });

  const handleFormatChange = (event) => {
    setFormattingDefaults({
      ...formattingDefaults,
      [event.target.name]: event.target.value,
    });
  };

  return {
    formattingDefaults,
    handleFormatChange,
  };
};

export default useFormattingDefaults;