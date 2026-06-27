{"import { useState } from 'react';

interface Props {
  language: string;
  defaults: { [key: string]: any };
}

const useFormattingDefaults = ({ language, defaults }: Props) => {
  const [formattedDefaults, setFormattedDefaults] = useState(defaults);

  return [formattedDefaults, setFormattedDefaults];
};

export default useFormattingDefaults;