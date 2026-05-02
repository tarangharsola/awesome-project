{"import { useState } from 'react';

interface Props {
  language: string;
}

const useFormattingDefaults = ({ language }: Props) => {
  const [defaults, setDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    newline: '\n',
  });
  const handleUpdate = (updates: { [key: string]: any }) => {
    setDefaults((prevDefaults) => ({ ...prevDefaults, ...updates }));
  };
  return [defaults, handleUpdate];
};

export default useFormattingDefaults;