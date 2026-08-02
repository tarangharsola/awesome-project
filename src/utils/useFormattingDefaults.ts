{"import { useState, useEffect } from 'react';

interface Props {
  language: string;
  defaults: { [key: string]: any };
}

const useFormattingDefaults = ({ language, defaults }: Props) => {
  const [formattedDefaults, setFormattedDefaults] = useState(defaults);

  useEffect(() => {
    const formattedDefaults = {
      ...defaults,
      // Add formatting defaults for each language
      // For example:
      // [language]: {
      //   indentSize: 2,
      //   tabSize: 4,
      //   newline: '\n'
      // }
    };
    setFormattedDefaults(formattedDefaults);
  }, [language, defaults]);

  return formattedDefaults;
};

export default useFormattingDefaults;