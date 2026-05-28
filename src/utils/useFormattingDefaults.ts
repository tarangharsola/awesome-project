{"import { useReducer, useState } from 'react';

const useFormattingDefaults = () => {
  const [formattingDefaults, setFormattingDefaults] = useState({});

  const handleFormattingDefaultsChange = (newFormattingDefaults) => {
    setFormattingDefaults(newFormattingDefaults);
  };

  return {
    formattingDefaults,
    handleFormattingDefaultsChange
  };
};

export default useFormattingDefaults;