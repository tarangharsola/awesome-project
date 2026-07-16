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

  const handleUpdate = (key: string, value: any) => {
    setDefaults((prevDefaults) => ({ ...prevDefaults, [key]: value }));
  };

  return {
    defaults,
    handleUpdate,
  };

  return useFormattingDefaults;
}
export default useFormattingDefaults;