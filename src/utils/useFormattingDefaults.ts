{"import { useState } from 'react';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({});

  const handleFormatChange = (newFormattingDefaults) => {
    setFormattingDefaults(newFormattingDefaults);
  };

  return {
    formattingDefaults,
    handleFormatChange
  };
};

export default useFormattingDefaults;