{"import { useState, useEffect } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';

interface Props {
  language: string;
}

const useEditor = ({ language }: Props) => {
  const [value, setValue] = useState<Value>(Value.fromJSON({}));
  const [language, setLanguage] = useState<string>(language);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(language);
    };

    return handleLanguageChange;
  }, [language]);

  return {
    value,
    setValue,
    language,
    setLanguage
  };
};

export default useEditor;