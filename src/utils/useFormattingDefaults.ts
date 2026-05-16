{"import { useState } from 'react';

interface Props {
  language: string;
}

const useFormattingDefaults = (props: Props) => {
  const [defaults, setDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    insertSpaces: true,
  });

  return defaults;
};

export default useFormattingDefaults;