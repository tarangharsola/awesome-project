{"import { useState } from 'react';

interface Props {
  language: string;
}

const useFormattingDefaults = (props: Props) => {
  const [defaults, setDefaults] = useState({
    indentSize: 2,
    tabSize: 2,
    newline: '\n',
  });

  const handleLanguageChange = (language: string) => {
    switch (language) {
      case 'javascript':
        setDefaults({
          indentSize: 2,
          tabSize: 2,
          newline: '\n',
        });
        break;
      case 'python':
        setDefaults({
          indentSize: 4,
          tabSize: 4,
          newline: '\n',
        });
        break;
      case 'html':
        setDefaults({
          indentSize: 2,
          tabSize: 2,
          newline: '\n',
        });
        break;
      default:
        setDefaults({
          indentSize: 2,
          tabSize: 2,
          newline: '\n',
        });
        break;
    }
  };

  return {
    defaults,
    handleLanguageChange,
  };
}

export default useFormattingDefaults;